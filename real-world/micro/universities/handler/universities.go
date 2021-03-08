package handler

import (
	"context"
	"encoding/json"
	"io/ioutil"

	log "github.com/micro/micro/v3/service/logger"

	universities "universities/proto"
)

type Universities struct{
}

// Call is a single request handler called via client.Call or the generated client code
func (e *Universities) Call(ctx context.Context, req *universities.Request, rsp *universities.Response) error {
	log.Info("Received Universities.Call request")

	// file, err := ioutil.ReadFile("/var/vhosts/oppari/real-world/micro/universities/universities.json") // when running in local environment
	file, err := ioutil.ReadFile("/universities/universities.json")
	if err != nil {
		log.Infof("Failed to read file: %s", err)
	}
	var allUniversities []*universities.University

	if err := json.Unmarshal([]byte(file), &allUniversities); err != nil {
		log.Infof("Failed to unmarshal json: %s", err);
	}

	var filteredUniversities []*universities.University
	selectedCountry := req.Country

	for s := range allUniversities {
		if allUniversities[s].Country == selectedCountry {
			filteredUniversities = append(filteredUniversities, allUniversities[s])
		}
	}

	rsp.Universities = filteredUniversities

	/*
		Continue: update the make file that sets the auth guards
		How to get the user token that we use for requesting endpoint?
		Maybe it would be possible to generate long token?
		If too complicated, skip using token
	*/

	return nil
}

// Stream is a server side stream handler called via client.Stream or the generated client code
func (e *Universities) Stream(ctx context.Context, req *universities.StreamingRequest, stream universities.Universities_StreamStream) error {
	log.Infof("Received Universities.Stream request with count: %d", req.Count)

	for i := 0; i < int(req.Count); i++ {
		log.Infof("Responding: %d", i)
		if err := stream.Send(&universities.StreamingResponse{
			Count: int64(i),
		}); err != nil {
			return err
		}
	}

	return nil
}

// PingPong is a bidirectional stream handler called via client.Stream or the generated client code
func (e *Universities) PingPong(ctx context.Context, stream universities.Universities_PingPongStream) error {
	for {
		req, err := stream.Recv()
		if err != nil {
			return err
		}
		log.Infof("Got ping %v", req.Stroke)
		if err := stream.Send(&universities.Pong{Stroke: req.Stroke}); err != nil {
			return err
		}
	}
}
