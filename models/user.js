// import {schema,model}from mongoose;

// const userSchema=new schema({
//     name:
//     {
//         type:String,
//         required:[true,"user name is required"],
//         trim:true,
//         maxLength:[32,"Name is too long"],
//         minLength:[2,"Name is too short"]
//     },
//     email:{
//         type:String,
//         require:[true,"user email is required"],
//         trim:true,
//         validate:{
//             validator:function (v) {
//                 return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
//             },
//             message:(props)=>'${props.value} is not a valid Email'
//         },
//         required:[true,"email is required"],
//         unique:true
//     },
//     phone:{
//         type:String,
//         trim:true,
//         validate:{
//             validator:function(v){
//                  return /^(?:\+91|91)?[6-9]\d{9}$/.test(v)
//             },
//             message:(prop)=>'$(props.value) is not a valid phone number'
//         }
//     },
//     password:{
//         type:String,
//         trim:[true,"Password is required"]
//     },
//     gender:{
//         type:String,
//         enum:["male","female","other"]
//     },
//     image:{
//         type:String,
//         trim:true,
//         default:null
//     },
//     address:{
//         type:String,
//         trim:true,
//         default:null
//     },
//     isDeleted:{
//         type:Boolean,
//         default:false
//     },
//     role:{
//         type:String,
//         enum:["user","admin"],
//         default:"user"
//     }
// },{timeStamps:true});

// const userModel=model("user",userSchema);

// export default userModel;