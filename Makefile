NESTCOMPOSEFILE = nestjs/docker-compose.yml
NESTOUTPUTCPU = nestjs/cpustats.txt
NESTOUTPUTMEM = nestjs/memstats.txt

run-nest:

	@echo "Deploying NestJS containers"
	#docker-compose -f $(NESTCOMPOSEFILE) build
	docker-compose -f $(NESTCOMPOSEFILE) up -d

	@touch $(NESTOUTPUTCPU)
	@touch $(NESTOUTPUTMEM)

	# Store cpu usage before running tests
	@echo "before" > $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	@echo "Running performance tests"
	k6 run --vus 10 --duration 2s k6/script.js

	# Store total cpu usage after running tests
	@echo "after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	# Store max memory used in bytes
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/memory.max_usage_in_bytes" > $(NESTOUTPUTMEM)

	@echo "Shutting down NestJS containers"
	docker-compose -f $(NESTCOMPOSEFILE) down
