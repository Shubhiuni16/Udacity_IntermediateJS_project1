//dino JSON data
const dinoJSON={
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
} 

    // Create Dino Constructor
    const Dino=function(species, weight, height, diet, where, when, fact,image) {
        this.species = species;
        this.weight= weight;
        this.height= height;
        this.diet= diet;
        this.where=where;
        this.when=when;
        this.facts = fact;
        this.image = image;
    }


    // Create Dino Objects
    const dinoData=[];
    dinoJSON.Dinos.forEach((d)=>{//console.log(d.species);
        dinoData.push(new Dino(d.species,d.weight,d.height,d.diet,d.where,d.when,d.fact,"images/" + d.species.toLowerCase() + ".png"))
    });
    
    // Create Human data from form
    const humanData = function () {
        const species = document.getElementById("name").value;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("feet").value*12+document.getElementById("inches").value;
        const diet = document.getElementById("diet").value;
        const image = "images/human.png";
        const facts="";
      
        return {species, weight, height, diet, image,facts};
      };

      //compare 1
      function compareHeight(human,dino){
        if(human.height<=dino.height){
            return `I am ${dino.height-human.height} inches taller than ${human.species} :)`
        }
        else{
            return `I am ${human.height-dino.height} inches smaller than ${human.species} :(`
        }
      }
      //compare 2
      function compareWeight(human,dino){
        if(human.weight<=dino.weight){
            return `I am ${dino.height-human.height} lbs heavier than ${human.species} :)`
        }
        else{
            return `I am ${human.height-dino.height} lbs lighter than ${human.species} :(`
        }
      }

      //compare 3 
      function compareDiet(human,dino){
        if(human.diet.toUpperCase!=dino.diet.toUpperCase){
            return `I am ${dino.diet}ous while you are ${human.diet}ous :(`
        }
        else{
            return `I have similar eating habits as you :)`
        }
      }

      function addCompareFunctions(human,dino){
          //create random no. from 1 to 6 to select random fact tile 
            let randNo=Math.floor(Math.random()*6)+1;
            if((dino.species=="Pigeon")||(dino.species===human.species)){
                randNo=3
            }
            switch(randNo){
              case 1:
                  return compareHeight(human,dino);
        
              case 2:
                  return compareWeight(human,dino);
              
              case 3:
                  return dino.facts;
              
              case 4:
                  return compareDiet(human,dino);

              case 5:
                  return `I used to live in ${dino.where}.`

              case 6:
                  return `I lived in ${dino.when} era.`
          }
      }
      function tileFormat(tile){
        const div = document.createElement("div");
        div.classList = "grid-item";
        div.innerHTML = `<h3>${tile[0]}</h3>
                        <img src="${tile[1]}">
                        <p>${tile[2]}</p> `;

        return div;
      }

    //events to occur when submit is clicked
    document.getElementById('btn').addEventListener('click', async() => {
        // Remove form from screen
        document.querySelector('form').style.display = 'none';
        const formData=humanData();
        //adding human data to dino data so human tile occurs in middle
        dinoData.splice(4,0,formData);
        //tile data will have data required in tile formation
        const tileData=[];
        dinoData.forEach((d)=>{
            const fact=addCompareFunctions(formData,d)
            tileData.push([d.species,d.image,fact])
        }) 

        //appending tiles in grid
        tileData.forEach((tile)=>{
            document.getElementById("grid").appendChild(tileFormat(tile))
        })
        
        //add submit again button to refresh screen
        var loadAgain = document.createElement("BUTTON");   
        loadAgain.innerHTML = "SUBMIT AGAIN";                   
        document.body.appendChild(loadAgain);
        loadAgain.addEventListener('click',async()=>{location.reload()});

      })
      

