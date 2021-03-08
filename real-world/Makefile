NESTCOMPOSEFILE = nestjs/docker-compose.yml
NESTOUTPUTCPU = nestjs/cpustats.txt
NESTOUTPUTMEM = nestjs/memstats.txt
NESTOUTPUTK6 = nestjs/k6-summary.json

SPRINGCOMPOSEFILE = spring/docker-compose.yml
SPRINGOUTPUTCPU = spring/cpustats.txt
SPRINGOUTPUTMEM = spring/memstats.txt
SPRINGOUTPUTK6 = spring/k6-summary.json

MICROMAKEFILE = micro/Makefile
MICROCOMPOSEFILE = micro/docker-compose.yml
MICROOUTPUTCPU = micro/cpustats.txt
MICROOUTPUTMEM = micro/memstats.txt
MICROOUTPUTK6 = micro/k6-summary.json

run-nest:

	@echo "Deploying NestJS containers"
	#docker-compose -f $(NESTCOMPOSEFILE) build
	docker-compose -f $(NESTCOMPOSEFILE) up -d
	@echo "Waiting for application to boot up"
	@sleep 10s

	@touch $(NESTOUTPUTCPU)
	@touch $(NESTOUTPUTMEM)
	@touch $(NESTOUTPUTK6)

	# Store cpu usage before running tests
	@echo "universities before" > $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q universities)/cpuacct.stat" >> $(NESTOUTPUTCPU)
	@echo "gateway before" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	@echo "Running performance tests"
	k6 run ../k6/real-world/script-nestjs.js

	# Store total cpu usage after running tests
	@echo "universities after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q universities)/cpuacct.stat" >> $(NESTOUTPUTCPU)
	@echo "gateway after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	# Store max memory used in bytes
	@echo "universities" > $(NESTOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q universities)/memory.max_usage_in_bytes" >> $(NESTOUTPUTMEM)
	@echo "gateway" >> $(NESTOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q gateway)/memory.max_usage_in_bytes" >> $(NESTOUTPUTMEM)

	@echo "Shutting down NestJS containers"
	docker-compose -f $(NESTCOMPOSEFILE) down


run-spring:

	@echo "Deploying Spring containers"
	#docker-compose -f $(SPRINGCOMPOSEFILE) build
	docker-compose -f $(SPRINGCOMPOSEFILE) up -d

	@touch $(SPRINGOUTPUTCPU)
	@touch $(SPRINGOUTPUTMEM)
	@touch $(SPRINGOUTPUTK6)

	# wait for all of the applications to register with Eureka
	@echo "Waiting for application to register with Eureka"
	@sleep 90s

	# Store cpu usage before running tests
	@echo "universities before" > $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q universities)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "gateway before" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "eureka before" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)

	@echo "Running performance tests"
	k6 run ../k6/real-world/script-spring.js

	# Store total cpu usage after running tests
	@echo "universities after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q universities)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "gateway after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "eureka after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)

	# Store max memory used in bytes
	@echo "universities" > $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q universities)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)
	@echo "gateway" >> $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)
	@echo "eureka" >> $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)

	@echo "Shutting down Spring containers"
	docker-compose -f $(SPRINGCOMPOSEFILE) down


run-micro:
	@echo "Deploying Micro container"
	make -C micro/

	@touch $(MICROOUTPUTCPU)
	@touch $(MICROOUTPUTMEM)
	@touch $(MICROOUTPUTK6)

	# Store cpu usage before running tests
	@echo "before" > $(MICROOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/cpuacct.stat" >> $(MICROOUTPUTCPU)

	@echo "Running performance tests"
	k6 run ../k6/real-world/script-micro.js

	# Store total cpu usage after running tests
	@echo "after" >> $(MICROOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/cpuacct.stat" >> $(MICROOUTPUTCPU)

	# Store max memory used in bytes
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/memory.max_usage_in_bytes" > $(MICROOUTPUTMEM)

	@echo "Shutting down Micro container"
	docker-compose -f $(MICROCOMPOSEFILE) down