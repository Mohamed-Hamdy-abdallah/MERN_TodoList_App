import Preloader from "./component/Preloader";
import {useEffect ,useState}from 'react';
import { readTodos ,createTodos , updatetodo , deleteTodo} from "./functions";

function App() {
  const [todo, setTodo] = useState({title:'',content:''})
  const [todos, settodos] = useState(null)
  const [ID, setID] = useState(0)
  

  const onsubmit = async(e)=>{
    if (ID ===0)
    {
      if (todo.title === '' || /^\s*$/.test(todo.title)|| todo.content === '' || /^\s*$/.test(todo.content ) ){
        alert ("Note shoulden't be empty ");
        return ;
        
    }
      const result = await createTodos (todo)
    console.log(result)
    settodos([...todos,result]);
  clear()  
  }
    else{
      if (todo.title === '' || /^\s*$/.test(todo.title)|| todo.content === '' || /^\s*$/.test(todo.content ) ){
        alert ("Note shoulden't be empty ");
        return ;
      }
      await updatetodo ( ID,todo)
      clear()
    }
    e.preventDefault();
    
  }

  const removeTodo = async (id) => {
     await deleteTodo(id);
  const result =  await readTodos();
  console.log(result)
  settodos(result)
        
  }
//////////////////////////////////////////////////
  const clear =()=>
  {
    setID(0);
    setTodo({title:'',content:''})
  }
  useEffect(() => {
    const clearField = (e) => {
      if(e.keyCode === 27){
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
  return () => window.removeEventListener('keydown', clearField)
},[])
///////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    
    let currentitem = ID!=0? todos.find((todo)=>todo._id===ID) :{title :'' , content :''}
    setTodo(currentitem)
    
  },[ID])

  useEffect(() => {
    const fetchdata = async ()=>{
      const result =await readTodos();
      settodos(result);
      console.log(result);
    }
    fetchdata()
  }, [ID])
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onsubmit}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate"
                value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate"
                value={todo.content}
                onChange={e => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>
        {
          !todos ? <Preloader /> : todos.length > 0 ? <ul className="collection">
            {todos.map(todo => (
              <li key={todo._id}

                className="collection-item"><div ><h5 >{todo.title}</h5>
                  <p>{todo.content}<a className="secondary-content"><i className="material-icons" onClick={() => setID(todo._id)}>update</i><i className="material-icons" onClick={() => removeTodo(todo._id)}>delete</i></a></p></div></li>

            ))}

          </ul> : <div><h5>Nothing to do</h5></div>
        }


      </div>

    </div>


  );
}

export default App;
