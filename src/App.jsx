import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  let l = JSON.parse(localStorage.getItem("keyList"))
  
  const [list, setList] = useState(l != null ? l: [])
  const checkRef = useRef();
  const [mainCheck ,setMainCheck] = useState(false)
  const [inpValue,setValue] = useState()
  const checkedFunc = (e)=>{
      if(e.target.checked)
      {
        setMainCheck(true);
      }
      else{
        setMainCheck(false)
      }
  }
  const addTask = ()=>{
    if(inpValue == "")
      {
        return;
      }
    list.push({
      task: inpValue,
      completed:false
    })
    localStorage.setItem("keyList",JSON.stringify(list))
    setValue("")
    setMainCheck(mainCheck)
  }
  const onDelete = (e)=>{
    let a = list.filter(a => a.task != e.target.id)
    localStorage.setItem("keyList",JSON.stringify(a))
    setList(a)
    // console.log(e.target.key)
    
  }
  const onEdit = (e,id)=>{
    setValue(id);
    let a = list.filter(a=> {a.task != id});
    localStorage.setItem("keyList",JSON.stringify(a));
    setList(a)
    
  }

  const onMark = (e,id)=>{
   
    let arr = list
    let i = arr.findIndex(obj => obj.task === id)

    if(mainCheck)
      {
        arr[i].completed = false
        
      }
    else{
      arr[i].completed = true
      
    }
    
    localStorage.setItem("keyList" , JSON.stringify(arr))
    setList(arr);
    setMainCheck(!mainCheck)
   
    
  }
  return (
    <>
      <div className='mainDiv'>
        <h2>My TODO list</h2>
        <div className='inpBtn'>
          <input type="text" className='input' value={inpValue} onChange={(e)=>{setValue(e.target.value)}} ref={checkRef}/>
          <button onClick={addTask}>ADD</button>

        </div>
        <div className='checkDiv'>
          <input type="checkbox"  name='check' onChange={checkedFunc} id='checkFirst' checked={mainCheck}/> 
          <label htmlFor="checkFirst"> Show completed list</label>
        </div>
        
        <div className='showerList'>
        {list.length == 0 && <h2>Nothing to show</h2>}
          {mainCheck ? list.filter(a=> a.completed === true).map(doc =>{
            return (<div key={doc.task} className='div'><div className='para'><button onClick={(e)=>{onMark(e,doc.task)}} className='radio'>✔</button><div className='task crossed'>{doc.task}</div></div><div className='btn'><button onClick={(e)=>{onEdit(e,doc.task)}}>Edit</button><button onClick={onDelete} id={doc.task}>Delete</button></div></div>)
          }):list.filter(a=> a.completed === false).map(doc =>{
            return (<div key={doc.task} className='div'><div className='para'><button onClick={(e)=>{onMark(e,doc.task)}} className='radio'></button><div className='task'>{doc.task}</div></div><div className='btn'><button onClick={(e)=>{onEdit(e,doc.task)}}>Edit</button><button onClick={onDelete} id={doc.task}>Delete</button></div></div>)
          })}
        </div>

      </div>

    </>
  )
}

export default App
