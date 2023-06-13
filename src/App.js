import React from "react";

function App() {

  const [names,setNames]=React.useState([]);
  const [notifications, setNotifications]=React.useState([

  ]);

  // {
  //   name:"Added Item",
  //       type:"added"
  // },
  // {
  //   name:"Deleted Item",
  //       type:"deleted"
  // },

  const addName=(nm)=>{
    // if getItem was just string, we do not need to parse
    const newNames =JSON.parse(localStorage.getItem("names"));
    newNames.push(nm);
    localStorage.setItem("names", JSON.stringify(newNames));
    updateNames();

    const addedNot = {name:"Added Item", type:"added"}
    const newNotifications = notifications;
    notifications.push(addedNot);
    setNotifications(newNotifications)
  }

  const removeName =(idx)=>{
    const newNames =JSON.parse(localStorage.getItem("names"));
    newNames.splice(idx,1);
    localStorage.setItem("names", JSON.stringify(newNames));
    updateNames();

    const addedNot = {name:"Deleted Item", type:"deleted"}
    const newNotifications = notifications;
    notifications.push(addedNot);
    setNotifications(newNotifications)
  }

  const updateNames=()=>{

    if(localStorage.names){
      const currentNames = JSON.parse(localStorage.getItem("names"));
      setNames(currentNames)
    }else{
      localStorage.setItem("names", JSON.stringify([]));
    }
  }

  React.useEffect(()=>{
    updateNames();
  },[])

  React.useEffect(()=>{
    const interval =setInterval(()=>{
      if(notifications.length>1){
        setNotifications(notifications.splice(0,1))
      }else{
        setNotifications([])
      }
    }, 3500);
    return ()=> clearInterval(interval)
  },[notifications])

  return (
    <>
      <div className={"notifications"}>
        {
          notifications.map((itm,idx)=>
            <div className={"notification "+itm.type} key={idx}>{itm.name}</div>
          )
        }
      </div>
      <div>
        <button onClick={()=>addName("Luke")}>Luke</button>
        <button onClick={()=>addName("Prof")}>Prof</button>
        {names.map((itm,idx)=>
          <h1 onClick={()=>removeName(idx)} key={idx}>{itm}</h1>
          )}
      </div>

    </>
  );
}

export default App;
