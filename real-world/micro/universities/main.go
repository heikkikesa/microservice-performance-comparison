package main

import (
	"universities/handler"
	pb "universities/proto"

	"github.com/micro/micro/v3/service"
	"github.com/micro/micro/v3/service/logger"
)

func main() {
	// Create service
	srv := service.New(
		service.Name("universities"),
		service.Version("latest"),
	)

	// Register handler
	pb.RegisterUniversitiesHandler(srv.Server(), new(handler.Universities))

	// Run service
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
