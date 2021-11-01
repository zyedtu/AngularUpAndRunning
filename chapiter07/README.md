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
Habituellement, lorsque nous construisons un formulaire, nous avons généralement un ensemble de champs et d'éléments dans le formulaire. Dans ces cas, le **FormGroup** est utile pour regrouper les champs de formulaire pertinents sous un seul groupe. Cela nous donne la possibilité de suivre les contrôles de formulaire individuellement ou en groupe. Par exemple, nous pouvons obtenir la valeur complète du formulaire ou vérifier si le formulaire dans son ensemble est valide (en raison d'éléments individuels et de leur état).     
Voyons comment nous pouvons étendre l'exemple de la section précédente pour créer un formulaire complet d'un stock à l'aide des instances FormControl et FormGroup.    
Dans un premier temps, nous verrons comment modifier le template *create-stock.component.html* pour demander à l'utilisateur tous les champs pertinents d'un stock:   

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()"> <!-- ligne 3 -->
            <div class="stock-name">
                <input type="text" placeholder="Stock name" name="stockName" formControlName="name"> <!-- ligne 5-->
            </div>
            <div class="stock-code">
                <input type="text" placeholder="Stock code" name="stockCode" formControlName="code">
            </div>
            <div class="stock-price">
                <input type="number" placeholder="Price" name="stockPrice" formControlName="price">
            </div>
        </form>
        <button type="submit">Submit</button>
    </div>
    <p>Form groupe value: {{ stockForm.value | json }}</p> <!-- ligne 16 -->
    <p>Form groupe status: {{ stockForm.status | json }}</p>
* ligne 3: Nous nous lions le formulaire maintenant à un formGroup au lieu d'un formControl.
* ligne 5: Une fois que nous utilisons un formGroup, nous utilisons **formControlName** à l'intérieur du groupe
* ligne 16: On affiche sur l'écran la valeur du form group (groupe de formulaires) au lieu de l'élément.

Le changement majeur par rapport à l'exemple précédent est que nous sommes passés de la **liaison (binding)** à formControl à un formGroup. Nous le faisons au niveau du formulaire. Maintenant, à l'intérieur, pour chaque élément de formulaire, nous mentionnons un formControlName. Chacun d'eux se liera à un élément individuel au sein du formGroup. Enfin, nous affichons la valeur actuelle et l'état du formulaire de la même manière que nous l'avons fait pour le FormControl.    

De plus, pour une meilleure lisibilité, nous avons cessé d'appeler le contrôle nameControl et l'appelons simplement name, code et price dans le composant.    
Voyons ensuite comment nous modifions la classe de composants createstock.component.ts pour que cet exemple fonctionne:   

    export class CreateStockComponent implements OnInit {

    public stockForm: FormGroup;
    constructor() { 
        this.stockForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        price: new FormControl(0, [Validators.required, Validators.min(0)])
        });
    }

    ngOnInit(): void {
    }

     onSubmit() {
        console.log('Name Control Value', this.stockForm.value);
     }
    }
Dans le composant, nous instancions et exposons maintenant une instance FormGroup, nommée stockForm. C'est ce à quoi nous nous étions liés au niveau du formulaire dans le Template (modèle). FormGroup nous permet d'instancier plusieurs FromControl dedans, et nous l'avons fait pour instancier un contrôle de formulaire pour le nom, le code et le prix. Cette fois, nous utilisons également le constructeur du FormControl dans la mesure du possible, en ajoutant une valeur par défaut et des validateurs au besoin.   
Le premier argument du constructeur FormControl est la valeur par défaut du contrôle de formulaire. Ici, nous initialisons les valeurs par défaut des deux contrôles de formulaire à null et 0, respectivement.    
Le deuxième argument du constructeur FormControl peut être soit un seul validateur, soit un tableau de validateurs. Il existe un ensemble de validateurs intégrés pour garantir que le FormControl est requis ou a une valeur minimale. Ces validateurs peuvent être soit synchrones (comme ceux que nous avons utilisés), soit également asynchrones (par exemple, pour vérifier si un nom d'utilisateur est disponible sur le serveur). Vous pouvez consulter les validateurs intégrés dans les documents officiels d'Angular.     
Lorsque le formulaire est soumis (à l'aide de la liaison d'événement ngSubmit), nous affichons ensuite la valeur complète du groupe de formulaires sur la console.    
### Form Builders(Générateurs de formulaires):    
Maintenant, alors que le FormGroup nous donne la possibilité de créer des formulaires complexes et imbriqués (et en passant, vous pouvez absolument imbriquer d'autres groupes de formulaires dans un groupe de formulaires !), sa syntaxe est légèrement verbeuse. Et c'est pourquoi, pour le remplacer, nous avons un FormBuilder dans Angular, ce qui le rend légèrement plus agréable pour construire ces formulaires riches de manière plus propre.     
La bonne chose à propos de FormBuilder est que nous n'avons pas à changer ou même à toucher à notre modèle. Le **FormBuilder** nous permet de créer rapidement des éléments FormGroup et FormControl sans appeler manuellement *new* sur ces objets.        
La forme réactive s'appuie toujours sur ces éléments sous-jacents pour son fonctionnement, et FormBuilder ne les supprime pas.      
Voyons comment nous pouvons changer votre composant CreateStock pour utiliser FormBuilder. Nous allons modifier le fichier create-stock.component.ts comme suit:     

    export class CreateStockComponent implements OnInit {

    public stockForm: FormGroup; // ligne 11
    constructor(private fb: FormBuilder) { // ligne 12
        this.createForm();
    }

    createForm(): void {
        this.stockForm = this.fb.group({  // ligne 17
        name: [null, Validators.required],  // ligne 18
        code: [null, [Validators.required, Validators.minLength(2)]],
        price: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
    }

     onSubmit() {
        console.log('Name Control Value', this.stockForm.value);
     }
    }

* Import du FormBuilder de @angular/forms.
* Ligne 11: On n'initialise plus le FormGroup en le déclarant. 
* Ligne 12: Injecter une instance de FormBuilder dans le constructeur. 
* Ligne 17: Créer un FormGroup à l'aide de l'instance FormBuilder injectée.
* Ligne 18: Initialiser le contrôle de nom avec une valeur nulle initiale et un validateur requis.  

Le changement majeur de cette façon pour créer de formulaire avec Angular, est de nous injectons d'abord une instance du FormBuilder dans notre constructeur. Ensuite, dans le constructeur lui-même, nous utilisons la méthode group sur l'instance FormBuilder pour créer ensuite les différents contrôles de formulaire.     
Même pour créer les contrôles de formulaire, nous utilisons simplement le syntaxique FormBuilder.     
# Form Data (Données de formulaire): 
Jusqu'à présent, nous avons accédé aux valeurs de données du formulaire via le FormControl ou le FormGroup. Dans cette section, nous aborderons le modèle et les données de formulaire, et comment les formulaires réactifs nous permettent de le gérer le contrôle et l'état du formulaire (comme valide, invalide, etc.).    
### Control State, Validity, and Error Messages (État du contrôle, validité et messages d'erreur): 
Avant d'approfondir la façon dont le modèle de formulaire est structuré et comment cela correspond avec notre modèle de données dans le composant, nous allons d'abord couvrir les aspects les plus simples, qui traitent *l'état et la validité du contrôle*. Le traitement de l'état et de la validité du contrôle de formulaire est assez similaire à la façon dont nous le gérons avec les formulaires basés sur des modèles *template-driven forms*, en ce sens que les états de contrôle de base et la validité sont les mêmes.       
Il y a deux aspects:   
* L'état: qui nous permet de voir l'état du contrôle de formulaire, si l'utilisateur l'a visité, s'il l'a modifié et enfin s'il est dans un état valide.
* La validité: qui nous indique si un contrôle de formulaire est valide ou non, et s'il n'est pas valide, la ou les raisons sous-jacentes pour lesquelles l'élément de formulaire est invalide.   

Ce qui change avec les fomulaire reactif, c'est la méthode d'accès à ces propriétés.
Ajoutons maintenant des messages d'erreur à notre formulaire que nous avons construit jusqu'à présent, afin que nous puissions afficher les messages d'erreur respectifs le long de chaque champ. Cela dit, nous ne voulons afficher ces messages d'erreur que si l'utilisateur a interagi avec un champ, et pas avant. Donc, par défaut, lorsque la page s'ouvre, nous ne voulons afficher aucun message d'erreur.     
Ci-dessous, un rappel rapide sur les états de base du contrôle angulaire:   
![Alt text](https://github.com/zyedtu/AngularUpAndRunning/blob/master/chapiter07/imgReadme/controlstates.png?raw=true "Title")         
Nous pourrions les utiliser pour mettre en évidence et afficher les erreurs et l'état du formulaire, comme nous l'avons fait auparavant. Mais pour cette section, nous nous concentrerons sur l'affichage uniquement des messages d'erreur conditionelle et sur la gestion propre des cas avec plusieurs validateurs.    
Voyons maintenant comment modifier le modèle pour commencer à afficher les messages d'erreur pertinents dans le formulaire, tout en utilisant l'approche du formulaire réactif. Nous allons éditer le fichier create-stock.component.html comme suit:     

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()"> <!-- ligne 3 -->
            <div class="stock-name">
                <input type="text" placeholder="Stock name" name="stockName" formControlName="name"> 
                <div class="error" *ngIf="stockForm.get('name').invalid &&   <!-- ligne 6-->
                            ( stockForm.get('name').dirty ||
                            stockForm.get('name').touched )">Name is required</div>
            </div>
            <div class="stock-code">
                <input type="text" placeholder="Stock code" name="stockCode" formControlName="code">
                <div class="error" *ngIf="stockForm.get('code').invalid &&
                            ( stockForm.get('code').dirty ||
                            stockForm.get('code').touched )">
                    <div *ngIf="stockForm.get('code').errors.required"> <!-- ligne 28-->
                            Stock Code is required
                    </div>
                    <div *ngIf="stockForm.get('code').errors.minlength">
                            Stock Code must be at least 2 characters
                    </div>
                </div>
            </div>
                ..........
                ..........
            <button type="submit">Submit</button>
        </form>
    </div>
    <p>Form groupe value: {{ stockForm.value | json }}</p> 
    <p>Form groupe status: {{ stockForm.status | json }}</p>
* Ligne 6: Accéder à la validité d'un élément de contrôle individuel via le groupe de formulaires **stockForm.get('name').invalid**.        
* linge 28: Vérification du statut de validateur individuel pour un élément de formulaire.    

Bien que le formulaire de base reste le même que dans l'exemple précédent, nous l'avons modifié maintenant pour afficher les messages d'erreur conditionnels. Il y a quelques choses remarquables qui se produisent dans ce modèle:    
* Pour chaque élément de formulaire, nous avons ajouté un élément div en dessous pour afficher les messages d'erreur conditionnels.   
* Pour chaque élément, nous obtenons d'abord l'élément de formulaire individuel en appelant stockForm.get() avec le nom du contrôle de formulaire individuel que nous avons fourni lors de l'instanciation du FormGroup dans la classe de composant.    
* Avec chaque FormControl, nous pouvons ensuite vérifier diverses propriétés telles que si l'élément de formulaire a été touché ou non (c'est-à-dire si l'utilisateur a accédé à l'élément) avec **touched**, si l'élément de formulaire a été modifié ou non **(dirty ou pristine)**, et si c'est valable ou non **invalid**.      
* Pour les champs de formulaire avec plus d'un validateur (principalement le code de stock et le prix), nous examinons plus en détail la propriété error sur le contrôle de formulaire. Ce champ nous permet de vérifier quel type d'erreur rend le champ de formulaire invalide, et ainsi d'afficher le message d'erreur correspondant.      

### Utilisation des getters:   
Au lieu de répéter stockForm.get('price') à chaque fois, on peut créer des getters simples dans la classe de composant comme ci-dessous:  

    export class CreateStockComponent implements OnInit {
            /* Skipping irrelevant code here */
        get name() { return this.stockForm.get('name'); }
        get code() { return this.stockForm.get('code'); }
        get price() { return this.stockForm.get('price'); }
    }
Maintenant, dans votre code HTML, vous pouvez simplement vous référer à name.invalid au lieu de stockForm.get('name').invalid et ainsi de suite.   

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()"> <!-- ligne 3 -->
            <div class="stock-name">
                <input type="text" placeholder="Stock name" name="stockName" formControlName="name"> <!-- ligne 5-->
                <div class="error" *ngIf="name.invalid && (name.dirty ||name.touched)">Name is required</div>
            </div>
            ......
De cette façon, nous pouvons interagir avec l'état des contrôles de formulaire et fournir une expérience utilisateur correcte aux utilisateurs de notre application Web.     
# Form and Data Model (Formulaire et modèle de données):  
Nous allons maintenant commencer à approfondir l'accès et l'utilisation des données qui alimentent le formulaire, ainsi que l'interaction entre le formulaire et le modèle de données dans notre composant. Nous avons simplifié cela jusqu'à présent dans les exemples précédents, en accédant simplement à la valeur du FormGroup ou du FormControl. C'est également ce que nous connectons à la fois dans le modèle à l'aide du tuyau json, ainsi que dans le composant lorsque nous cliquons sur le bouton Soumettre.     

Utilisons un exemple pour montrer comment nous travaillons avec le formulaire et le modèle de données, et comment les deux interagissent. Pour cele nous créons un nouveau composant (pour ne pas polier le composant *create-stock.component.ts*):

    > ng g c create/create-stock2
Nous commençons par éditer le Template *create-stock2.component.html* comme ci-dessous:    

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
            <!-- Repeated code from before, omitted for brevity -->
            <button type="submit">Submit</button>
            <button type="button" (click)="resetForm()">
                Reset
            </button>
            <button type="button" (click)="loadStockFromServer()">
                Simulate Stock Load from Server
            </button>
            <button type="button" (click)="patchStockForm()">
                Patch Stock Form
            </button>
        </form>
    </div>
    <p>Form Control value: {{ stockForm.value | json }} </p>
    <p>Form Control value: {{ stockForm.status | json }} </p>
La plupart du modèle n'a pas changé, mais nous avons ajouté trois nouveaux boutons à la fin du formulaire. Tous trois font appel à une méthode de la classe component, que nous verrons dans un instant. Mais les trois boutons effectuent fondamentalement les deux actions suivantes:

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
        <!-- Repeated code from before, omitted for brevity stock-item.component.html -->
        <button  class="styleB" type="submit">Submit</button>
            <button class="styleB" type="button" (click)="resetForm()">
                Reset
            </button>
            <button class="styleB" type="button" (click)="loadStockFromServer()">
                Simulate Stock Load from Server
            </button>
            <button class="styleB" type="button" (click)="patchStockForm()">
                Patch Stock Form
            </button>
        </form>
    </div>
    <p>Form Control value: {{ stockForm.value | json }} </p>
    <p>Form Control value: {{ stockForm.status | json }} </p>
La plupart du modèle n'a pas changé, mais nous avons ajouté trois nouveaux boutons à la fin du formulaire. Tous trois font appel à une méthode de la classe component, que nous verrons dans un instant. Mais les trois boutons effectuent fondamentalement les deux actions suivantes:    
* Le bouton Reset: Réinitialiser le formulaire à son état d'origine.  
* Le bouton Patch Stock Form: Simuler le chargement d'un stock depuis le serveur.   

Passons maintenant à la classe *CreateStock2Component*, où se produisent la plupart des activités et des changements. Nous allons éditer le fichier createstock2.component.ts comme suit:   

    let counter=1;
    @Component({
    selector: 'app-create-stock2',
    templateUrl: './create-stock2.component.html',
    styleUrls: ['./create-stock2.component.scss']
    })
    export class CreateStock2Component implements OnInit {
        private stock: Stock; // ligne 13
        public stockForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
        this.stock = new Stock('Test ' + counter++, 'TST', 20, 10); // ligne 18
    }

    ngOnInit(): void {
    }

    createForm() {
        this.stockForm = this.fb.group({
        name: [null, Validators.required],
        code: [null, [Validators.required, Validators.minLength(2)]],
        price: [0, [Validators.required, Validators.min(0)]]
        });
    }
    loadStockFromServer() {
        this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
        let stockFormModel = Object.assign({}, this.stock);
        delete stockFormModel.previousPrice;
        delete stockFormModel.favorite;
        this.stockForm.setValue(stockFormModel); // ligne 36
    }
    patchStockForm() {
        this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
        this.stockForm.patchValue(this.stock); // ligne 40
    }
    resetForm() {
        this.stockForm.reset(); // ligne 43
    }
    onSubmit() {
        this.stock = Object.assign({}, this.stockForm.value);
        console.log('Saving stock', this.stock);
    }
    }

* ligne 13: Nous avons introduit un objet stock, en plus du modèle de formulaire.
* ligne 18: Instanciation de notre de l'objet stock avec une valeur par défaut.  
* ligne 36: Mettre à jour ou pousser (setter) nos valeurs de modèle de données stock dans le modèle formulaire avec.   
* ligne 40: Patcher (Mettre à jour) le modèle de formulaire avec tous les champs disponibles (une partie ou sous-ensemble du modèle stock).  
* ligne 43: Remettre le formulaire à son état initial.   

Nous utilisons **la méthode setValue** sur l'instance stockForm de FormGroup. Cette méthode prend un objet de modèle JSON qui correspond exactement au modèle de formulaire. Cela signifie que pour que setValue fonctionne dans ce cas, il a besoin d'un objet avec un nom, un code et une clé de prix. Il ne devrait pas avoir plus ou moins de clés que cela, car cela *générerait une erreur dans ce cas*.     
Ainsi, le déclenchement de la méthode loadStockFromServer finirait par mettre à jour le formulaire avec le nom, le code et le prix de l'instance de stock nouvellement créée.      
La deuxième méthode, patchStockForm, utilise une autre méthode sur l'instance stockForm de FormGroup appelée **patchValue**. Le PatchValue est utilisé pour mettre à jour uniquement un sous-ensemble des éléments du FormGroupou FormArray. Il ne mettra à jour que les objets correspondants et ignore le reste.   

La dernière méthode est le resetForm, qui réinitialise simplement le formulaire à son état initial en appelant la méthode **reset** sur 'instance stockForm de FormGroup.    
# FormArrays:   
Maintenant, supposons que pour chaque stock, nous voulions capturer et mettre en évidence les personnes clés liées à l'entreprise. Sachant, pour une entreprise on peut avoir de 0 à n presonnes associées. Cela nous permettra de voir comment nous pouvons gérer les formulaires et comment nous devons capturer plusieurs valeurs ainsi de gérer proprement les éléments de formulaire imbriqués.    

Tout d'abord, nous commencent par mettre à jour notre classe modèle Stock en ajoutant un tableau d'objet People, et en ajoutant aussi la classe People.   

    export class Stock {
        favorite: boolean = false;
        notablePeople: Person[];

        constructor(public name: string,
                public code: string,
                public price: number,
                public previousPrice: number) {  
                    this.notablePeople = [];
                }
                    
        get isPositiveChange(): boolean {
            return this.price >= this.previousPrice;
        }
    }

    export class Person {
        name: string;
        title: string;
    }
Nous avons ajouté une nouvelle classe Person avec un nom et un titre, puis l'avons ajoutée en tant qu'enfant à la classe Stock, avec le nom notablePeople. Dans le constructeur de la classe Stock, nous l'avons initialisé dans un tableau vide.   

Pour ce paragraphe nous allons crée un nouveau composant pour ne pas polluer notre composant *create-stock2.component.ts*: 

    > ng g c stock/create-stock3
Passons maintenant à notre classe CreateStock3Component. Tout d'abord, passons en revue les modifications apportées à la classe de composants, qui se trouve dans *create-stock3.component.ts*:    

    export class CreateStock3Component implements OnInit {

    public stockForm: FormGroup;
    private stock: Stock;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit(): void { }

    createForm(): void {
        this.stockForm = this.fb.group({
        name: [null, Validators.required],
        code: [null, [Validators.required, Validators.minLength(2)]],
        price: [0, [Validators.required, Validators.min(0)]],
        notablePeople: this.fb.array([]) // ligne 26
        });
    }

    get notablePeople(): FormArray { // ligne 30
        return this.stockForm.get('notablePeople') as FormArray;
    }
    addNotablePerson() { // ligne 33
        this.notablePeople.push(this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required]
        }))
    }

    removeNotablePerson(index: number) { // ligne 40
        this.notablePeople.removeAt(index);
    }

    resetForm() {
        this.stockForm.reset();
    }

    onSubmit() {
        this.stock = Object.assign({}, this.stockForm.value);
        console.log('Saving stock', this.stock);
    }
    .....
    }

* ligne 26: Initialiser notablePeople en tant qu'instance FormArray.  
* ligne 30: Getter pour faciliter l'accès au FormArray sous-jacent à partir du modèle.    
* ligne 33: Ajouter une nouvelle instance FormGroup au FormArray.  
* ligne 40: Supprimer une instance FormGroup particulière du FormArray.  

Il y a quelques éléments à noter dans le code de la classe de composants:      
* notablePeople est une élément de FormGroup principal. Notez que notablePeople est une instance FormArray avec une valeur initiale qui est vide. Au cas où nous devions le remplir avec des valeurs existantes, nous le transmettrions au constructeur.   
* Nous avons créé **un getter** simple pour notablePeople, qui va en profondeur dans l'instance stockForm de FormGroup et renvoie l'instance notablePeople FormArray. C'est plus pour que le modèle et de cette façon on va écrire this.stock Form.get('notablePeople') à chaque fois.       
* Étant donné que nous pouvons avoir de zéro à plusieurs personnes notables par action, nous avons besoin d'une méthode nous permettant d'ajouter autant de personnes remarquables que nous le souhaitons. C'est ce que fait la méthode **addNotablePerson()**. Notez que chaque instance de personne notable dans le formulaire réel est représentée par un FormGroup. Ainsi, chaque fois que nous voulons ajouter une nouvelle personne notable, nous ajoutons une instance FormGroup avec un nom et un titre requis.    
* De même, nous voulons pouvoir supprimer toute personne notable que nous avons ajoutée, ce que fait la méthode **removeNotablePerson()**. Il prend un index et supprime simplement cet index particulier de l'instance FormArray.     

Enfin, regardons maintenant comment le modèle change pour afficher tout cela. Nous allons creat-stock3.component.html comme suit:    

    <h2>Create Stock Form</h2>
    <div class="form-group">
        <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
        <!-- No change until the end of price form element -->
        <!-- Omitted for brevity -->
        <div formArrayName="notablePeople">
                <div *ngFor="let person of notablePeople.controls; let i = index" [formGroupName]="i"
                    class="notable-people">
                    <div>
                        Person {{i + 1}}
                    </div>
                    <div>
                        <input type="text" placeholder="Person Name" formControlName="name">
                    </div>
                    <div>
                        <input type="text" placeholder="Person Title" formControlName="title">
                    </div>
                    <button type="button" (click)="removeNotablePerson(i)">Remove Person</button>
                </div>
            </div>
            <button type="button" (click)="addNotablePerson()">Add Notable Person</button>
            <button class="styleC" type="submit">Submit</button>
            <button class="styleC" type="button" (click)="resetForm()">Reset</button>
        </form>
    </div>
    <p>Form groupe value: {{ stockForm.value | json }}</p> 
    <p>Form groupe status: {{ stockForm.status | json }}</p>
Il y a quelques points à noter sur la façon dont nous avons relié l'instance FormArray que nous avons créée dans notre composant au modèle du composant:    
* La directive **FormArrayName** est utilisé pour lié l'objet *FormArray notablePeople* à l'élément div.     
* Au lieu d'utiliser formControlName, nous utilisons **formGroupName** sur l'élément div englobant. C'est l'élément qui contiendra de zéro à plusieurs formes, une pour chaque personne notable.    
* Nous avons alors un élément div qui se répété à chaque fois pour une entrée dans l'instance FormArray, auquel nous accédons via notablePeople.controls. Le notable People accède au getter *notablePeople* que nous avons créé dans la classe composant.    
* Nous exposons également l'indice actuel du *ngFor via la variable i.    
* Nous connectons ensuite le FormGroup qui est chaque élément du FormArray via la liaison formGroupName, le liant à chaque index individuel du tableau.      
* Cela nous permet ensuite d'utiliser formControlName individuellement pour le nom et le titre comme nous l'avons fait jusqu'à présent. Cela garantit que le nom et le titre sont liés à cette instance FormGroup particulière indiquée par l'index dans le FormArray.     
* Enfin, nous avons le bouton Remove Person dans chaque instance *ngFor, qui appelle la méthode removeNotablePerson(), et un bouton global Add Person, qui appelle la méthode addNotablePerson().    

