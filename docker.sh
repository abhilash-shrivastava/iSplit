# get the latest container
docker pull jensvdh/isplit:latest

# kill any containers that are already running
docker kill isplit
docker rm isplit

# restart the container
docker run -idt --name isplit -p 8080:8080 jensvdh/isplit:latest

# start nginx
docker exec isplit service nginx start

# run the deploy script in the '/' folder of our container
docker exec isplit sh /deploy.sh
