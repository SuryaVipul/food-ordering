import { Component } from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/userContext";

// class About extends Component {
//   constructor(props) {
//     super(props);
//     console.log('Parent constructor');
//   }
//   componentDidMount () {
//     console.log('Parent Component Did Mount');
//   }
//   render (){
//     console.log("Parent Render");
//     return (
//       <div>
//         <h1>This is about us Page</h1>
//         <div>
//           <UserClass
//             name={"First"}
//             location={"Mumbai"}
//             contact={"9082800659"}
//           />
//         </div>
//       </div>
//     );
//   }
// }


const About = () => {
  return (
    <div className="mx-4 my-10">
      <h1>This is a about us page</h1>
      <div>
        loggedIn User
        <UserContext.Consumer>
          {({loggedInUser}) => <h2 className="text-xl font-bold">{loggedInUser}</h2>}
        </UserContext.Consumer>
        <UserClass
          name={"Surya Shukla"} 
          location={"Mumbai"}
          contact={"9082800659"}
        />
      </div>
    </div>
  );
};

export default About;
