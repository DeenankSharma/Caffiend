import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useState,useContext, createContext, useEffect } from "react";
import { auth, db }  from '../../firebase'
import { doc, DocumentData, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User|null;
  globalData: any;
  setGlobalData: React.Dispatch<React.SetStateAction<any>>;
  isloading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  globalData: null,
  setGlobalData: () => {},
  isloading: false,
  login: async () => Promise.resolve(),
  signup: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export function useAuth(){
  return useContext(AuthContext)
}


export function AuthProvider(props:any){
  const {children} = props

  const [user,setUser] = useState<User|null>(null)
  const [globalData,setGlobalData]=useState<DocumentData|null>(null)
  const[isloading,setIsLoading] = useState(false)

  

  function signup(email:any,password:any){
    return createUserWithEmailAndPassword(auth,email,password)
  } 

  function login(email:any,password:any){
    return signInWithEmailAndPassword(auth,email,password)
  } 

  function logout(){
    setGlobalData(null)
    setUser(null)
    return signOut(auth)
  }


  const value = { user ,globalData,setGlobalData,isloading,login,signup,logout}

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,async (user)=>{ 
      setUser(user)
      if(!user){
        return
      }
      try {
        setIsLoading(true)
        const docRef = doc(db,"users",user.uid)
        const docSnap= await getDoc(docRef)
        let firebaseData: DocumentData | null = null;

        if (docSnap.exists()) {
          console.log("found user data");
          firebaseData = docSnap.data(); // Returns DocumentData
        }
        
        setGlobalData(firebaseData);

      } catch (error) {
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
     })
    return unsubscribe
  },[])


  return(<AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>)
}