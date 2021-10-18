
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
* selector: 'app-stock-item' entraînerait l'utilisation du composant en HTML: 
    
        <app-stock-item></app-stock-item>
* selector: '.app-stock-item', entraînerait l'utilisation du composant comme une classe CSS dans le code HTML:        

        <div class="app-stock-item"></div>
* selector: '[app-stock-item]', entraînerait l'utilisation du composant comme attribut sur un élément existant:

        <div app-stock-item></div>
##### Template:  
Jusqu'à présent, nous avons utilisé templateUrl pour définir le modèle à utiliser avec un composant. Le chemin que vous transmettez à l'attribut templateUrl est **relatif** au chemin du composant. Dans le cas précédent, nous pouvons soit spécifier le templateUrl et cela fonctionnerait. Mais si vous essayez de spécifier une URL absolue ou quoi que ce soit d'autre, votre compilation va échouer.     

        templateUrl: './stock.item.component.html'
Au lieu de templateUrl, nous pourrions également spécifier le modèle en ligne dans le composant, en utilisant l'attribut **template**. Cela nous permet de faire en sorte que le composant contienne toutes les informations au lieu de les diviser en code HTML et TypeScript. Comme le code ci-dessous:     

    @Component({
    selector: 'app-stock-item',
    template: `
        <div class="stock-container">
        <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
        <div class="price"
        [class]="stock.isPositiveChange() ? 'positive' : 'negative'">
        $ {{stock.price}}
        </div>
        <button (click)="toggleFavorite($event)"
        *ngIf="!stock.favorite">Add to Favorite</button>
        </div>
        `,
    styleUrls: ['./stock-item.component.css']
    })
    export class StockItemComponent implements OnInit {
        // Code omitted here for clarity
    }
* Remarque: template ou templateUrl peut être spécifié dans un composant. Vous ne pouvez pas utiliser les deux, mais au moins un est essentiel.   
##### Styles: 
Un composant donné peut être associé à plusieurs styles. Cela vous permet d'extraire du CSS spécifique au composant. Vous pouvez soit incorporer votre CSS à l'aide de l'attribut **styles**, ou s'il y a une quantité importante de CSS, vous pouvez l'extraire dans un fichier séparé et l'intégrer dans votre composant à l'aide de l'attribut **styleUrls**.       
##### Style Encapsulation:   
Angular encapsule les styles de chaque composant, pour s'assurer qu'il ne sera pas utilisé ou plolué les autres. En fait, vous pouvez réellement dire à Angular s'il doit le faire ou non, ou si les styles peuvent être accessibles globalement. Vous pouvez définir cela en utilisant l'attribut **encapsulation** sur le décorateur composant. L'attribut d'encapsulation prend l'une des trois valeurs suivantes:     
* ViewEncapsulation.Emulated: Il s'agit de la valeur **par défaut**, où Angular crée un CSS spécial pour émuler le comportement fourni par les shadow DOM (pas utilisation de Shadow DOM).    
* ViewEncapsulation.Native:  Angular créera un Web Component complet avec l’utilisation du Shadow DOM et du CSS scopé au component.        
* ViewEncapsulation.None: Utilise le CSS global, sans aucune encapsulation.    

- Définition Shadow DOM: Le Shadow DOM fait parti des Web Components qui sont un ensemble de technologies permettant justement le développement d’interfaces ou de widgets réutilisables nativement dans le navigateur. En clair, il permet de définir du comportement interne à notre DOM sans qu’il interfère sur les autres parties de notre application. Il permet aussi de définir du style spécifique.     

La meilleure façon de voir comment cela affecte notre application est d'apporter une légère modification et de voir comment votre application se comporte dans différentes circonstances.   
On ajoute dans le fichier *app.component.scss* ce code:   

        .name {
                font-size: 50px;
        }
Ensuite dans le composant on ajoute l'attribut **ViewEncapsulation.None**:    

        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        encapsulation: ViewEncapsulation.None
        })
        export class AppComponent {
                title = 'app works!';
        }
Maintenant, si nous actualisons notre application, vous verrez que le nom du stock a été gonflé à 50px. En effet, les styles appliqués sur AppComponent ne se limitent pas au composant, mais prennent désormais l'espace de noms global.         
ViewEncapsulation.None est un bon moyen d'appliquer des styles communs à tous les composants enfants, mais ajoute définitivement le risque d'affecter l'espace de noms CSS global et d'avoir des effets non intentionnels.     
### Components and Modules:   
Avant d'entrer dans les détails du cycle de vie d'un composant, examinons rapidement comment les composants sont liés aux modules et quelle est leur relation. Au chapitre 2, nous avons vu comment chaque fois que nous créions un nouveau composant, nous devions l'inclure dans un module. Si vous créez un nouveau composant et ne l'ajoutez pas à un module, Angular se plaindra que vous avez des composants qui ne font partie d'aucun module.      
Pour qu'un composant soit utilisé dans le contexte d'un module, il doit être importé dans votre fichier de déclaration de module et déclaré dans le tableau des déclarations. Cela garantit que le composant est visible pour tous les autres composants du module.     
Il existe trois attributs spécifiques sur le NgModule qui ont un impact direct sur les composants et leur utilisation, qu'il est important de connaître. Bien que seules les déclarations soient importantes au départ, une fois que vous commencez à travailler avec plusieurs modules, ou si vous créez ou importez d'autres modules, les deux autres attributs deviennent essentiels:    
* declarations:  
* imports:  
* exports:   
### Input and Output:
##### Input: 
##### Output: 
##### Change Detection: 
### Component Lifecycle: 
### Interfaces and Functions: