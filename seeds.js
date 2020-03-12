const mongoose = require('mongoose');
const Campground = require("./models/campground")
const Comment = require("./models/comments")
let data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjvZAUXK_-bSqeMVinCoAfNAF-svIeElxznu77_7LIoEXg6Bll",
        description: "Purr purr purr until owner pets why owner not pet me hiss scratch meow disappear for four days and return home with an expensive injury; bite the vet and demand to be let outside at once, and expect owner to wait for me as i think about it and making bread on the bathrobe. If human is on laptop sit on the keyboard. Kitty poochy meeeeouw, and paw your face to wake you up in the morning, and hiiiiiiiiii feed me now so freak human out make funny noise mow mow mow mow mow mow success now attack human spend six hours per day washing, but still have a crusty butthole. Decide to want nothing to do with my owner today. "
    },
    {
        name: "Lover's peak",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ6ACzlR8eeMRVfcueWdnO9C1mmQXmD78MADizFVjCbu3gk6W1",
        description: "Lick human with sandpaper tongue eat the rubberband sit on the laptop lies down and eat the fat cats food. Spit up on light gray carpet instead of adjacent linoleum stares at human while pushing stuff off a table but soft kitty warm kitty little ball of furr i vomit in the bed in the middle of the night but this is the day or flee in terror at cucumber discovered on floor scratch leg; meow for can opener to feed me. Sweet beast cat not kitten around sit in a box for hours. Headbutt owner's knee rub my belly hiss so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad for look at dog hiiiiiisssss poop in the plant pot, yet i will be pet i will be pet and then i will hiss."
    },
    {
        name: "Desert Rose",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS83PuGvYB7Xqq5dgam067zgrd5bSdrm-jq-kWvdI-z9hEgWxcF",
        description: "Slap kitten brother with paw get my claw stuck in the dog's ear cat not kitten around yet chase the pig around the house yet hey! you there, with the hands. Munch on tasty moths at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in but trip on catnip for fart in owners food so get video posted to internet for chasing red dot. Sleep all day whilst slave is at work, play all night whilst slave is sleeping human is washing you why halp oh the horror flee scratch hiss bite no, you can't close the door, i haven't decided whether or not i wanna go out, eat the fat cats food hide head under blanket so no one can see. Eat owner's food. Pose purrfectly to show my beauty sit in window and stare oooh, a bird, yum for pooping rainbow while flying in a toasted bread costume in space or cough hairball, eat toilet paper cough hairball on conveniently placed pants. Thinking longingly about tuna brine."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
    //      if(err){
    //          console.log(err);
    //      }
    //      console.log("removed campgrounds!");
    //       //add a few campgrounds
    //      data.forEach(function(seed){
    //          Campground.create(seed, function(err, campground){
    //              if(err){
    //                  console.log(err)
    //              } else {
    //                  console.log("added a campground");
    //                  //create a comment
    //                  Comment.create(
    //                      {
    //                          text: "This place is great, but I wish there was internet",
    //                          author: "Homer"
    //                      }, function(err, comment){
    //                          if(err){
    //                              console.log(err);
    //                          } else {
    //                              campground.comments.push(comment);
    //                              campground.save();
    //                              console.log("Created new comment");
    //                          }
    //                      });
    //              }
    //          });
    //      });
    }); 
    //  //add a few comments
 }

module.exports = seedDB

