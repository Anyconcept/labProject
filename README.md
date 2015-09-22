# labProject
## Laravel - Angular - Bower Project

Quelques fichiers de base à ajouter à l'install de Laravel (5.1).

Histoire de ne plus avoir a copier/coller l'architecture Front-End, de céer un GulpFile et de refaire les install de tous les modules, installer Angular, ... 

## Installation

### Installer / Télécharger les dépots/dépendances
- Installation classique de Laravel
	- composer create-project laravel/laravel --prefer-dist nomDuProjet
- Télécharger et Copier les fichiers a la racine du projet laravel
	- cd nomDuProjet
	- clone https://github.com/Anyconcept/labProject.git
	- cp -pR labProject/* .
- Supprimer les sources téléchargées
	- rm -rf labProject/
	- rm -rf labProject.git/ 


### Installer les libs

- Installer dépenances NPM
	- npm install

- Installer dépendances Bower
	- bower install

### Configuration
- Modifier l'url du serveur de Browser-Sync ( ici, en local.dev )

### Lancer gulp
- gulp
 


## L'architecture 
- resources
	- assets
		- components 	-> installation des libs Bower
		- img 		-> images (hors thème)
		- js		
		- sass		-> fichiers .sass
			- img 	-> images du theme
	- lang
		- (Probablement toutes les langues possibles :p )
	- views 	
		- répertoires d'origines 



## gulpfile
### Les modules :
gulp, browser-sync, gulp-clean, gulp-rename, gulp-sass, gulp-autoprefixer, gulp-concat, gulp-uglify, gulp-minify-css, gulp-imagemin, gulp-changed, main-bower-files, gulp-filter, gulp-filter, gulp-size

### Après passage du gulpfile

- public
	- css
		- app.css (fichiers concatenés (non minifiés) 
		- vendor.css (fichiers css des libs concatenés et minifiés))
		
		- img 
			- images du theme minifiées
	- img	
		- images hors thème  (minifiées)
	- js 		
		- app.js (fichiers concatenés (non uglifyés)
		- vendor.js (fichiers js des libs concatenés et uglifyés)


** + Chargement d'un serveur Browser-Sync **


## Info utiles
Les librairies Bower sont installées dans **resources/assets/components/**
avant d'etres traitées via gulp...

### Si besoin
- Installer PHPUnit
	- composer install phpunit/phpunit



