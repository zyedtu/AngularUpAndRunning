                        # Productionizing an Angular App ( Production d'une application angulaire)#
                
Dans tous les chapitres jusqu'à présent, nous avons parlé des différents éléments qui s'ajoutent à une application Angular. Nous avons commencé par la base et nous sommes allés aux plus détaillés et complexes, des composants simples au routage et à tous les serveurs. Mais à travers tout cela, nous nous sommes concentrés sur la fonctionnalité et sur le fait que différents éléments interagissent et fonctionnent bien ensemble. À ce stade, en tant que développeur, vous êtes prêt à répondre à 90% de la plupart des besoins des applications Angular.      
Dans ce chapitre, nous allons nous concentrer sur ce qu'il faut fiare pour que l'application que vous avez construite se déploye en production de manière performante. Nous couvrirons toutes les choses que vous devrez garder à l'esprit lors du déploiement de vos applications Angular sur productio, ainsi que d'autres problèmes auxquels vous n'avez peut-être pas pensé. Nous verrons comment créer une application Angular pour la production, comment réduire la taille de la construction, comment améliorer les performances et même brièvement couvrir d'autres problèmes comme le référencement.       
# Building for Production (Consturction pour la production):
Jusqu'à présent, chaque fois que nous exécutons notre application, nous demandons généralement à l'Angular CLI de servir notre application, en exécutant:    

    > ng serve    
Cela exécute le compilateur Angular, crée et sert votre application Angular à l'aide du serveur interne dont dispose l'Angular CLI. Vous pouvez également utiliser la commande build pour générer les fichiers à utiliser pour la production. La commande serait simplement:    

    > ng build   
Cela générerait par défaut tous vos fichiers compilés dans un dossier appelé dist/. Vous pouvez ensuite simplement tout copier à partir de ce dossier, le mettre sur un serveur HTTP et être opérationnel. Mais ce n'est pas ce que vous devriez faire ! La version générée par défaut est une version sous-optimale et en surpoids qui ralentirait le chargement et l'exécution de votre application de production (comparativement, bien sûr !). Angular vous permet de créer une version optimisée de votre application, alors voyons comment nous pourrions le faire.   
### Production Build (Construction de production):
### Ahead-of-Time (AOT) Compilation and Build Optimizer (Compilation à l'avance (AOT) et Optimiseur de construction): 
##### JIT (Just-in-Time) - Compiler TypeScript juste à temps pour l'exécuter:    
Compilé dans le navigateur.
Chaque fichier compilé séparément.
Pas besoin de construire après avoir changé votre code et avant de recharger la page du navigateur.
Convient pour le développement local.            
##### AOT (Ahead-of-Time) - Compiler TypeScript pendant la phase de construction:
Compilé par la machine elle-même, via la ligne de commande (Faster).
Tout le code compilé ensemble, intégrant HTML/CSS dans les scripts.
Pas besoin de déployer le compilateur (la moitié de la taille Angular).
Plus sécurisé, source originale non divulguée.
Convient aux constructions de production.
### Base Href:  
### Deploying an Angular Application (Déployer une application angulaire): 
# Other Concerns (Autres préoccupations): 
### Caching (Mise en cache): 
### API/Server Calls and CORS (Appels API/serveur et CORS): 
### Different Environments (Différents environnements): 
### Handling Deep-Linking (Gestion des liens profonds):  
### Lazy Loading (Chargement paresseux):   
### Server-Side Rendering and Handling SEO (Rendu côté serveur et gestion du référencement): 