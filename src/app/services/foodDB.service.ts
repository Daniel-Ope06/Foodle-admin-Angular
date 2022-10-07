import { Database, ref, get, set, update, remove, query, orderByChild } from '@angular/fire/database';
import { Food } from '../models/food.model';

export class FoodDB{
    public static getAllFoods(db: Database): Food[]{
        let arr: Food[] = [];
        get(ref(db, 'menu')).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(element =>{
              arr.push(element.val());
            });
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
        return arr;
    }

    public static hashFoodName(name: string): string{
        // remove excess spaces and replace with underscores
        return (name.toLowerCase().replace(/\s+/g, ' ').trim().replace(/ /g, "_"));
    }

    public static addToFoodDB(db: Database, food: Food): void{
        const foodID = this.hashFoodName(food.name);
        set(ref(db, `menu/${foodID}`), {
            name: food.name,
            category: food.category,
            cost : food.cost,
          });
    }

    public static deleteFromFoodDB(db: Database, name: string): void{
        const foodID = this.hashFoodName(name);
        remove(ref(db, `menu/${foodID}`))
        .then(() =>{
          alert("Food deleted");
        })
        .catch((error) => {
          alert("Unable to delete");
        });
    }
}