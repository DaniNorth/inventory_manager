'use client'
import { firestore } from '@/firebase'
import { Box, Typography, Modal, Stack, TextField, Button, Autocomplete} from '@mui/material'
import { collection, doc, getDocs, query, setDoc, getDoc, deleteDoc, searchQuery} from 'firebase/firestore'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'
import { useEffect, useState} from 'react'

export default function Home() {
  const [ inventory, setInventory ] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ itemName, setItemName ] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredInventory, setFilteredInventory] = useState([])


  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory (inventoryList)
    setFilteredInventory(inventoryList)
  }

const removeItem = async (item) => {
  const docRef = doc(collection( firestore, 'inventory' ), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {quantity} = docSnap.data()
    if (quantity == 1){
      await deleteDoc(docRef)
    }
    else{
      await setDoc(docRef, {quantity: quantity - 1})
    }
  }
  await updateInventory()
}

const addItem = async (item) =>{
  const docRef = doc(collection( firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()){
    const {quantity} = docSnap.data()
    await setDoc( docRef, {quantity: quantity + 1})
  }
  else{
    await setDoc(docRef, {quantity: 1})
  }
  await updateInventory()
}

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSearch = (event, value) => {
    setSearchQuery(value)
    setFilteredInventory(
      inventory.filter(({ name }) =>
        name?.toLowerCase().includes(value?.toLowerCase() || '')
      )
    )
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{
        backgroundImage: `url('/pantry-background.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="30%"
          left="50%"
          width={500}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          sx={{
            transform:'translate(-50%, -50%)', borderRadius: '15px'
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              sx={{ borderRadius: '5px' }}
            />
            <Button
              variant="outline"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{ borderRadius: '5px' }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen()
        }}
        sx={{ borderRadius: '5px' }}
      >
        Add New Item
      </Button>

      <Autocomplete
        freeSolo
        options={inventory.map((item) => item.name)}
        value={searchQuery}
        onChange={handleSearch}
        onInputChange={handleSearch}
        sx={{ width: '50%' , bgcolor: "white", borderRadius: '5px'}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Items"
            variant="outlined"
            bgcolor="black"
            fullWidth
            sx={{ borderRadius: '5px' }}
          />
        )}
      />

      <Box border="2px solid #333" sx={{ borderRadius: '15px'}}>
        <Box
          width="800px"
          height="100px"
          bgcolor="#aeeeee"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '15px 15px 0 0' }}
        >
          <Typography variant="h3" color="#333">
            Inventory Items
          </Typography>
        </Box>
      <Stack
        width="800px"
        height="300px"
        spacing={2}
        overflow="auto"
        bgcolor="#deeeee"
        sx={{ borderRadius: '0 0 15px 15px' }}
      >
        {
          filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="75px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f0f0f0"
              padding={5}
              sx={{ borderRadius: '0 0 15px 15px' }}
            >
              <Typography variant="h7" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h7" color="#333" textAlign="center" >
                {quantity}
              </Typography>
              <Stack direction = "row" spacing = {2}>
              <Button variant = "contained" onClick={()=> {
                addItem(name)
              }}
              >
                Add
              </Button>
              <Button variant = "contained" onClick={()=> {
                removeItem(name)
              }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}