
.PHONY: deploy

all : deploy

deploy:
	ng build --base-href "https://maximum-data-science.github.io/wahl-o-mat-clone/"
	ngh --dir dist/wahl-o-mat-clone -S

install:
	set -xU CHROME_BIN /usr/bin/chromium
	sudo npm install -g @angular/cli
	sudo npm install -g angular-cli-ghpages
	sudo chown -R a /usr/lib/node_modules/angular-cli-ghpages/node_modules/gh-pages
