                    # Working with Reactive Forms (Formulaires Reactifs) # 
Dans le chapitre précédent, nous avons commencé à travailler sur notre première application angulaire basée sur des formulaires. Pour ce faire, nous avons exploré les formulaires basés sur des modèles **template-driven forms** et comment nous pourrions les créer et les utiliser dans le contexte d'une application Angular. Nous avons vu comment effectuer la liaison de données, travailler avec différents éléments de formulaire, ainsi qu'effectuer la validité et afficher les messages d'erreur pertinents.     
Dans ce chapitre, nous allons nous concentrer sur les mêmes choses, les formulaires, bien que cette fois, nous utiliserons une approche réactive **formulaire reactif**. Comme mentionné dans le chapitre précédent, Angular nous permet de créer des formulaires en utilisant deux approches: une approche basée sur des modèles et une basée sur les formulaires  réactive. Ces deux approches font partie de la bibliothèque de base @angular/forms, mais font partie de deux modules différents, FormsModule et ReactiveFormsModule, respectivement.     
# Reactive Forms (Formulaires réactifs):   
les formulaires réactifs, est une autre façon de concevoir vos formulaires dans Angular. Le nom réactif vient du style de programmation connu sous le nom de réactif. La programmation réactive, pour la simplifier, est le concept d'écriture d'un programme d'une manière qui la manipulation des données seront fait fondamentalement sur des flux de données asynchrones.    
Contrairement aux formulaires basés sur des modèles dans Angular, les formulaires réactifs, représente une copie du modèle d'origine, vous définissez l'intégralité de l'arborescence des objets de contrôle de formulaire Angular dans votre code de composant, puis vous les liez aux éléments de contrôle de formulaire natifs de votre modèle.    
### Understanding the Differences (Comprendre les différences): 
Maintenant, avec deux approches devant nous, la question se pose naturellement : laquelle est la meilleure ? La réponse, comme vous vous en doutez, est que ni l'un ni l'autre n'est vraiment « meilleur » que l'autre. Les deux ont leurs propres avantages et inconvénients.      
Lorsque nous créons des formulaires à l'aide de l'approche basée sur un modèle, nous déclarons les contrôles de formulaire dans le modèle et y ajoutons des directives (comme ngModel). Ensuite, Angular est responsable de la création des contrôles de formulaire à l'aide de directives.   
Cela dit, les formulaires basés sur des modèles sont agréables, déclaratifs et faciles à comprendre. Angular est responsable de la synchronisation du modèle de données et pousse les données vers le modèle et lit et met à jour les valeurs dans l'interface utilisateur via des directives telles que ngModel. Cela signifie également généralement moins de code dans la classe de composants.    
D'un autre côté, les formulaires réactifs sont synchronés, en tant que développeur, vouas avez un contrôle absolu sur comment et quand les données sont synchronisées de l'interface utilisateur au modèle et vice versa. Étant donné que vous créez l'intégralité de l'arborescence de contrôle de formulaire dans le composant, vous y avez accès immédiatement et n'avez pas à gérer le cycle de vie asynchrone d'Angular.    
# Using Reactive Forms (Utiliser des formulaires réactifs):  
Maintenant que nous avons brièvement comparé les formulaires réactifs aux formulaires basés sur des modèles et examiné les avantages et les inconvénients de chacun, examinons la création d'un formulaire réactif. Nous allons procéder étape par étape, en commençant par le bloc de construction des formulaires réactifs, les contrôles de formulaire **Form Controls**, et en progressant vers les autres composants tels que les groupes de formulaires **Form Groups**et les générateurs de formulaires **Form Builders**.   
### Form Controls (Contrôles de formulaire):    
Le noyau de tout formulaire réactif est le FormControl, qui représente directement un élément de formulaire individuel dans le modèle. Ainsi, toute forme réactive n'est rien d'autre qu'un ensemble de FormControls groupés. C'est au niveau FormControl que nous attribuons également des valeurs initiales et des validateurs (à la fois sync et async). Ainsi, tout ce que nous avons fait dans le modèle avec des formulaires basés sur des modèles se produit désormais au niveau FormControl dans le code TypeScript.     
Pour créer notre formulaire reactif, nous commençons par le création d'un nouveau composant *create-stock* avec notre outil Angular CLI:   

        ng g component stock/create-stock
La première chose à faire et d'importer le **ReactiveFormsModule** dans notre module principal *app.module.ts*, et d'ajouter ce module dans le tableau des imports du module principal.   

    import { ReactiveFormsModule } from '@angular/forms';

    @NgModule({
    declarations: [
        AppComponent,
        StockItemComponent,
        CreateStockComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
voyons comment créer un formulaire simple qui nous permet de prendre et de travailler avec un nom. Nous allons d'abord modifier le modèle de notre CreateStockComponent en changeant le Template *create-stock.component.html*.     

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <div class="stock-name">
            <input type="text" placeholder="Stock Name" 
                    name="stockName" [formControl]="nameControl"> <!-- ligne 5 -->
        </div>
        <button (click)="onSubmit()">Submit</button>
    </div>
    <p>Form Control value: {{ nameControl.value | json }}</p> <!-- ligne 9 -->
    <p>Form Control status: {{ nameControl.status | json }}</p>
* Dans la ligne 5 on utilise le FormControl pour le formulaire.  
* Dans la ligne 9 accéder à la valeur actuelle dans le champ du formulaire.    

l'élément form à **nameControl**. On peut alors dériver la valeur courante du contrôle de formulaire via ce champ, qu'il s'agisse de la valeur (via nameControl.value) ou de son statut (via nameControl.status, qui est toujours valable pour cet élément simple). Enfin, nous avons un simple bouton qui déclenche la méthode onSubmit() dans le composant.      
Ensuite, examinons le fichier *create stock/createstock.component.ts*, pour voir quelles modifications nous devons y apporter pour prendre en charge ce formulaire:   

    export class CreateStockComponent implements OnInit {

        public nameControl = new FormControl();

        constructor() { }
        ngOnInit(): void {
        }

        onSubmit() {
            console.log('Name Control Value', this.nameControl.value);
        }
    }
Dans le composant nous créons une **instance** de FormControl appelée nameControl, exactement le même nom que dans le Template.    

En résumé, il est utile de penser à FormControl lorsque nous devons suivre l'état et la valeur de tout élément de formulaire individuel, comme une zone de saisie ou une case à cocher. Dans la section suivante, nous verrons comment créer un formulaire plus complet en utilisant FormControl et un nouveau objet appelé FormGroup.     
### Form Groups: 
