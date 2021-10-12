console.log(`*************Welcome to the Meraki courses*************`)
console.log(`\n`)
const axios = require('axios');
async function GetRequest() {
    const response = await axios.get('http://saral.navgurukul.org/api/courses')
    const responseData = response.data;
    let coursesList = (responseData[`availableCourses`]);
    for (i in coursesList) {
        console.log(`${i}  ${coursesList[i]["name"]}`)
    }  
    console.log(`\n`);
    console.log(`***************Welcome to the  meraki exercise**************`);
    console.log(`\n`); 
    const readlineSync = require('readline-sync');
    const user_id = readlineSync.question('Please enter the course id ? ');
    var id = coursesList[user_id]["id"]
    console.log(`Your course name is :- ${coursesList[user_id]["name"]}`);
    console.log(`\n`);
    const exercise = await axios.get('http://saral.navgurukul.org/api/courses/'+id+'/exercises')
    var exercise_name = exercise.data
    const exerciseData = (exercise_name["data"])
    var list_of_slug=[]
    for (j in exerciseData) {
        console.log(`${j}  ${exerciseData[j]["name"]}`);
        list_of_slug.push(j,exerciseData[j]["name"])
    }
    console.log(`\n`);
    console.log(`****************Welcome to the slug****************`);
    console.log(`\n`);
    const userSlug = require("readline-sync").question("enter your slug id :-")
    const slug_data = (exerciseData[userSlug]["slug"])
    console.log(slug_data)
    const slugData = await axios.get('http://saral.navgurukul.org/api/courses/'+id+'/exercise/getBySlug?slug='+slug_data)
    const value = slugData.data
    const slugcontent = (value["content"])
    console.log(`${slugcontent}`)
}
GetRequest();
