const { default: axios } = require('axios');
async function Courses(callback) {
    console.log(`*************Welcome to the Meraki courses*************`)
    console.log(`\n`)
    let axios = require('axios');
    let response =  await axios.get('http://saral.navgurukul.org/api/courses')
    let responseData = response.data;
    var coursesList = (responseData[`availableCourses`]);
    for (i in coursesList) {
        console.log(`${i}  ${coursesList[i]["name"]}`)
    }  
    parents(coursesList)
    return coursesList,axios
}

async function parents(coursesList,callback){
    console.log(`\n`);
    console.log(`***************Welcome to the  meraki exercise**************`);
    console.log(`\n`); 
    let readlineSync = require('readline-sync');
    let user_id = readlineSync.questionInt('Please enter the course id ? ');
    var id = coursesList[user_id]["id"]
    console.log(`Your course name is :- ${coursesList[user_id]["name"]}`);
    console.log(`\n`);
    child(id,axios)
    return id;
}
Courses(parents)

async function child(id,axios){
        let exercise = await axios.get('http://saral.navgurukul.org/api/courses/'+id+'/exercises')
        var exercise_name = exercise.data
        let exerciseData = (exercise_name["data"])
        var list_of_slug=[]
        for (j in exerciseData) {
            console.log(`${j}  ${exerciseData[j]["name"]}`);
            list_of_slug.push(j,exerciseData[j]["name"])
        }
        slug(exerciseData,id)
        return exerciseData,id
}

async function slug(exerciseData,id){
        console.log(`\n`);
        console.log(`****************Welcome to the slug****************`);
        console.log(`\n`);
        let userSlug = require("readline-sync").questionInt("enter your slug id :-")
        let slug_data = (exerciseData[userSlug]["slug"])
        console.log(slug_data)
        let slugData = await axios.get('http://saral.navgurukul.org/api/courses/'+id+'/exercise/getBySlug?slug='+slug_data)
        let value = slugData.data
        let slugcontent = (value["content"])
        console.log(`${slugcontent}`)
}
