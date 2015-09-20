# labProject
## Laravel - Angular - Bower Project

Quelques fichiers de base à ajouter à l'install de Laravel (5.1).

Histoire de ne plus avoir a copier/coller l'architecture Front-End, de céer un GulpFile et de refaire les install de tous les modules, installer Angular, ... 

## Installation

Copier les fichiers a la racine du projet laravel

### A faire apres install

- Installer dépenances NPM
	- npm install

- Installer dépendances Bower
	- bower install



## L'architecture
- resources
	- assets
		- components 	-> installation des libs Bower
		- images 	-> images (hors thème)
		- imagesCSS	-> images du thème
		- js		
		- sass		-> fichiers .sass
	- lang
		- (Probablement toutes les langues possibles :p )
	- views 	
		- répertoires d'origines 



### gulpfile
#### Les modules :
gulp, browser-sync, gulp-clean, gulp-rename, gulp-sass, gulp-autoprefixer, gulp-concat, gulp-uglify, gulp-minify-css, gulp-imagemin, gulp-changed, main-bower-files, gulp-filter, gulp-filter, gulp-size

### Après passage du gulpfile

- public
	- css		-> 
				-> app.css (fichiers concatenés (non minifiés) 
				-> vendor.css (fichiers css des libs concatenés et minifiés))
				-> images du thème (minifiées)
	- images	-> images hors thème  (minifiées)
	- js 		-> 
				-> app.js (fichiers concatenés (non uglifyés)
				-> vendor.js (fichiers js des libs concatenés et uglifyés)


#### + Chargement d'un serveur Browser-Sync


## Info utiles
Les librairies Bower sont installées dans **resources/assets/components/**


### Si besoin
- Installer PHPUnit
	- composer install phpunit/phpunit



