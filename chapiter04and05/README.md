
# Understanding and Using Angular Components:   
Dans ce chapitre, nous approfondirons un peu les composants, ces éléments que nous avons créés pour afficher l'interface utilisateur et permettre aux utilisateurs d'interagir avec les applications que nous construisons. Nous couvrirons certains des attributs les plus utiles que vous pouvez spécifier lors de la création de composants, comment réfléchir au cycle de vie du composant et aux divers hooks qu'Angular vous offre, et enfin, comment transmettre des données dans et hors de vos composants personnalisés. À la fin du chapitre, vous devriez être capable d'effectuer les tâches les plus courantes liées aux composants tout en comprenant ce que vous faites et pourquoi.   
### Components—A Recap: 
Dans le chapitre précédent, nous avons traité des directives d'attribut et de structure, qui nous permettent de changer le comportement d'un élément existant ou de changer la structure du modèle en cours de rendu.      
Le troisième type de directives sont les composants, que nous utilisons pratiquement depuis le premier chapitre. Dans une certaine mesure, vous pouvez considérer qu'une application Angular n'est rien d'autre qu'un arbre de composants. Chaque composant à son tour a un certain comportement et un modèle qui est rendu. Ce modèle peut ensuite continuer à utiliser d'autres composants, formant ainsi une arborescence de composants, qui est l'application Angular qui est rendue dans le navigateur.       
Dans sa forme la plus simple, un composant n'est rien d'autre qu'une classe qui encapsule un comportement, et un modèle (Template). Mais il existe également plusieurs façons de définir cela, ainsi que d'autres options, que nous couvrirons dans les sections suivantes.      
### Defining a Component:   
Nous définissons un composant à l'aide du décorateur TypeScript **@Componant**. Cela nous permet d'annoter n'importe quelle classe avec des métadonnées qui enseignent à Angular comment fonctionne le composant, ce qu'il faut afficher, etc. Jetons un coup d'œil au composant stock-item que nous avons créé pour voir à quoi ressemblerait un composant simple, et nous allons construire à partir de là:   

        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
        })
        export class AppComponent {
            // Code omitted here for clarity
        }

##### Selector:  
L'attribut selector, nous permet de définir comment Angular identifie le composant lorsque il'est utilisé dans le clode HTML. Le sélecteur prend une valeur de chaîne, qui est le sélecteur CSS qu'Angular utilisera pour identifier l'élément.    
Par exemple, voici quelques façons de spécifier l'attribut selector et de l'utiliser dans le code HTML: (la première façon est recommendée)     
* selector: 'app-stock-item' entraînerait l'utilisation du composant comme: *<app-stock-item></app-stock-item>* enHTML.
   

##### Template
##### Styles
##### Style Encapsulation
##### Others
### Components and Modules:
### Input and Output:
##### Input: 
##### Output: 
##### Change Detection: 
### Component Lifecycle: 
### Interfaces and Functions: