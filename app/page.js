'use client';
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, TextField, Stack, Typography, Button} from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from 'firebase/firestore'
import { ST } from 'next/dist/shared/lib/utils';

export default function Home() {
   const [inventory, setInventory] = useState ([])
   const [open, setOpen] = useState(false)
   const [itemName, setItemName] = useState('')

   const updateInventory = async () => {
     const snapshot = query(collection(firestore, 'inventory'))
     const docs = await getDocs(snapshot)
     const inventoryList = []
     docs.forEach((doc)=>{
       inventoryList.push({
         name: doc.id,
         ...doc.data(),
       })
      })
      setInventory(inventoryList)
    }

    const addItem = async (item) => {
     const docRef = doc(collection(firestore, 'inventory'), item)
     const docSnap = await getDoc(docRef)

     if(docSnap.exists()){
       const {quantity} = docSnap.data()
       await setDoc(docRef, {quantity: quantity + 1})
      } else {
       await setDoc(docRef, {quantity: 1})
      }

   await updateInventory()
  } 

 const removeItem = async (item) =>{
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

   if(docSnap.exists()){
     const {quantity} = docSnap.data()
     if (quantity === 1){
      await deleteDoc(docRef)
     }
     else{
       await setDoc(docRef, {quantity: quantity - 1})
      }
    }

  await updateInventory()
 } 

  useEffect(()=>{
  updateInventory()
 }, [])

 const handleOpen = () => setOpen(true)
 const handleClose = () => setOpen(false)

 return (
    <Box
     width="100vw"
     height="100vh"
     display="flex"
     flexDirection="column"
     justifyContent="center"
     alignItems="center"
     gap={2}
     sx={{ backgroundColor: '#e4d7fd' }}
    >
       {/* Header */}
       <Box 
        width="100%" 
        bgcolor="#644590" 
        padding={2} 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1201 }}
      >
        <Typography variant="h4" color="white">
          Pantry Tracker
        </Typography>
      </Box>
      
      {/* Main Content */}
      <Box 
        width="100%" 
        height="100%" 
        paddingTop="80px" 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
      <Modal open={open} onClose={handleClose}>
        <Box 
         position= "absolute" 
         top= "40%" 
         left="35%"
         width={400}
         bgcolor="#e4d7fd"
         border="2px solid #644590"
         boxShadow={24}
         padding={4}
         display='flex'
         flexDirection="column"
         gap={3}
         sx={{
           transform: "translate-(-50%,-50%)",
         }}
        >
          <Typography variant='h6' color="#644590">Add Item</Typography>
          <Stack width="100" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName} 
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button variant="outlined" onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" 
      sx={{ backgroundColor: '#644590', color: 'white' }} 
      onClick={()=>{
        handleOpen()
      }}>
        Add New Item
      </Button>
      <Box border='1px solid #333'>
        <Box 
         width= "800px" 
         height="100px" 
         bgcolor="#644590" 
         display="flex"
         alignItems="center" 
         justifyContent="center"
        >
         <Typography variant='h2' color='white'>
          Inventory Items
         </Typography>
        </Box>
      <Stack width="100%" height="300px" spacing={2} overflow="auto">
        {inventory.map(({name, quantity}) => (
          <Box 
           key={name} 
           width="100%"
           minHeight="150px"
           display="flex"
           alignItems="center" 
           justifyContent="space-between"
           bgcolor="#d08bc8"
           padding={5}
          >
            <Typography variant='h3' color="#644590" textAlign="center" noWrap={false} sx={{ overflow: 'visible', width: 'auto' }} >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant='h3' color="#644590" textAlign="center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" sx={{ backgroundColor: '#644590', color: 'white' }} onClick={()=> {
             addItem(name)
            }}>
              Add
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#644590', color: 'white' }} onClick={()=> {
             removeItem(name)
            }}>
              Remove
            </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  </Box>
)}