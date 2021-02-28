NESTCOMPOSEFILE = nestjs/docker-compose.yml
NESTOUTPUTCPU = nestjs/cpustats.txt
NESTOUTPUTMEM = nestjs/memstats.txt

SPRINGCOMPOSEFILE = spring/docker-compose.yml
SPRINGOUTPUTCPU = spring/cpustats.txt
SPRINGOUTPUTMEM = spring/memstats.txt

MICROMAKEFILE = micro/Makefile
MICROCOMPOSEFILE = micro/docker-compose.yml
MICROOUTPUTCPU = micro/cpustats.txt
MICROOUTPUTMEM = micro/memstats.txt

run-nest:

	@echo "Deploying NestJS containers"
	#docker-compose -f $(NESTCOMPOSEFILE) build
	docker-compose -f $(NESTCOMPOSEFILE) up -d
	@echo "Waiting for application to boot up"
	@sleep 10s

	@touch $(NESTOUTPUTCPU)
	@touch $(NESTOUTPUTMEM)

	# Store cpu usage before running tests
	@echo "hello-world before" > $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)
	@echo "gateway before" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	@echo "Running performance tests"
	k6 run --vus 10 --duration 2s k6/script.js

	# Store total cpu usage after running tests
	@echo "hello-world after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/cpuacct.stat" >> $(NESTOUTPUTCPU)
	@echo "gateway after" >> $(NESTOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(NESTOUTPUTCPU)

	# Store max memory used in bytes
	@echo "hello-world" > $(NESTOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(NESTCOMPOSEFILE) ps -q hello-world)/memory.max_usage_in_bytes" >> $(NESTOUTPUTMEM)
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

	# wait for all of the applications to register with Eureka
	@echo "Waiting for application to register with Eureka"
	@sleep 90s

	# Store cpu usage before running tests
	@echo "helloworld before" > $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q helloworld)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "gateway before" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "eureka before" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)

	@echo "Running performance tests"
	k6 run --vus 10 --duration 2s k6/script.js

	# Store total cpu usage after running tests
	@echo "helloworld after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q helloworld)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "gateway after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)
	@echo "eureka after" >> $(SPRINGOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/cpuacct.stat" >> $(SPRINGOUTPUTCPU)

	# Store max memory used in bytes
	@echo "helloworld" > $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q helloworld)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)
	@echo "gateway" >> $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q gateway)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)
	@echo "eureka" >> $(SPRINGOUTPUTMEM)
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(SPRINGCOMPOSEFILE) ps -q eureka)/memory.max_usage_in_bytes" >> $(SPRINGOUTPUTMEM)

	@echo "Shutting down Spring containers"
	docker-compose -f $(SPRINGCOMPOSEFILE) down

# TODO: currently we only record CPU and MEM stats of the hello-world containers, should we use them all?

run-micro:
	@echo "Deploying Micro container"
	make -C micro/

	@touch $(MICROOUTPUTCPU)
	@touch $(MICROOUTPUTMEM)

	# Store cpu usage before running tests
	@echo "before" > $(MICROOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/cpuacct.stat" >> $(MICROOUTPUTCPU)

	@echo "Running performance tests"
	k6 run --vus 10 --duration 2s k6/script-micro.js

	# Store total cpu usage after running tests
	@echo "after" >> $(MICROOUTPUTCPU)
	@cat "/sys/fs/cgroup/cpu,cpuacct/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/cpuacct.stat" >> $(MICROOUTPUTCPU)

	# Store max memory used in bytes
	@cat "/sys/fs/cgroup/memory/docker/$$(docker-compose -f $(MICROCOMPOSEFILE) ps -q server)/memory.max_usage_in_bytes" > $(MICROOUTPUTMEM)

	@echo "Shutting down Micro container"
	docker-compose -f $(MICROCOMPOSEFILE) down