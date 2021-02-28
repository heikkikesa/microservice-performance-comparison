microup:
	docker-compose up -d server
	sleep 10s
	docker exec micro_server make micrologin
	docker exec micro_server make runhelloworld
	sleep 10s

micrologin:
	./micro login --username admin --password micro

runhelloworld:
	./micro run helloworld
