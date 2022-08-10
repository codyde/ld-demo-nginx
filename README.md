# LaunchDarkly NGINX and App Demo

This repo contains a demo of using LaunchDarkly's LUA SDK with Nginx (as well as within a Vite based React application). 

In order to use this demo you will need to build a docker image based off of it, you can accomplish this by switching into the directory and running... 

```
docker build -t yourdockerhubname/yourrepo:tag . 
```

And running the docker file. 

The SDK key is configured within the `shared.lua` file. Currently this is configured through a environment variable.
