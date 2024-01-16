# Notes

## January 10

Learned how to use github today. It is pretty simple. I will use `git clone` with the url to clone it onto my computer. Then, after I make changes or add files, I will use `git add` to add those files to be watched by git. Then, when I want to commit chnages, I use `git commit -m "message here"` and then `git push` to finish it all off.

## January 15

Created an AWS server instance. It is running nonstop. Should be free. I also got an elastic IP address and associated it with the instance so that the address does not change. To ssh into my server, I use this command `ssh -i production.pem ubuntu@52.44.90.249`. To do this, I need to be in the same directoy with production.pem. This is my private and public key to login. Need to make sure to disassociate the elastic IP at the end of the semester.