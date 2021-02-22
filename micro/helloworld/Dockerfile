FROM alpine
RUN apk add --no-cache \
        libc6-compat
ADD helloworld /helloworld

#COPY commands.sh /commands.sh
#RUN ["chmod", "+x", "/commands.sh"]

#ENTRYPOINT [ "sh", "/commands.sh" ]
#ENTRYPOINT [ "/bin/sh", "-c", "/helloworld",  "--auth_id", "admin", "--auth_secret", "micro" ]
ENTRYPOINT [ "./helloworld" ]
