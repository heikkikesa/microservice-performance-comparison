microup:
	docker-compose up -d server
	sleep 10s
	docker exec micro_server make micrologin
	docker exec micro_server make microdefineauth
	docker exec micro_server make rununiversities
	sleep 10s

micrologin:
	./micro login --username admin --password micro

rununiversities:
	./micro run universities

microdefineauth:
	./micro auth create rule --access=granted --scope="*" --resource="service:universities:*" loggedin
	./micro auth delete rule default
