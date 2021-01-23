NESTCOMPOSEFILE = nestjs/docker-compose.yml
NESTOUTPUTCPU = nestjs/cpustats.txt

run-nest:

	@echo "Deploying NestJS containers"
	#docker-compose -f $(NESTCOMPOSEFILE) build
	docker-compose -f $(NESTCOMPOSEFILE) up -d

	@touch $(NESTOUTPUTCPU)

	@echo "before" > $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)


	@echo "Running performance tests"
	k6 run --vus 10 --duration 2s k6/script.js

	@echo "after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)


	@echo "Shutting down NestJS containers"
	docker-compose -f $(NESTCOMPOSEFILE) down
