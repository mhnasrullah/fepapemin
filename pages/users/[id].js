import {
  Avatar,
  Heading,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Center,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
// import backend from "../../api/backend";
import Navbar from "../../components/navbar";
import { AuthContext } from "../../utils/AuthContext";
import authorize from "../../utils/authorize";
import API from "../../utils/endpoints"

const Detail = ({id}) => {
  const [mahasiswa, setMahasiswa] = useState({});
  const [matakuliahList, setMatakuliahList] = useState([]);
  const [user, setUser] = useState(null);
  const [matakuliahId, setMatakuliahId] = useState(null);
  const [loading,setLoading] = useState(false);
  const [actions,setActions] = useState(false)
  const { token, setToken } = useContext(AuthContext);
  const [error, setError] = useState([]);
  const router = useRouter();

  const getMahasiswa = async (nim) => {
    setLoading(true)
    try {
      const {data : {mahasiswa}} = await API.getOneMahasiswa(nim);
      setMahasiswa(mahasiswa)
    } catch (error) {
      // console.log(error);
    }
    setLoading(false)
  };

  const getMataKuliahList = async () => {
    
    try {
      const {data : {matakuliah}} = await API.getAllMataKuliah();
      setMatakuliahList(matakuliah)
    } catch (error) {
      // console.log(error);
    }
    
  };

  // const getUserByToken = async () => {
  //   try {
  //     const res = await backend.get("/mahasiswa/profile", {
  //       headers: {
  //         token,
  //         validateStatus: false,
  //       },
  //     });

  //     if (res.status !== 200) {
  //       alert(res.data.message);
  //       return;
  //     }

  //     return setUser(res.data.mahasiswa);
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

  const addMataKuliah = async (e) => {
    e.preventDefault();
    if(matakuliahId){
      setActions(true);
      try{
        await API.addMataKuliah(id,matakuliahId);
        setMatakuliahId(null)
      }catch(e){
        // console.log(e.response)
        if(e.response){
          const {data : {error}} = e.response
          // console.log(data)
          setError(error)
        }else{
          console.log(e);
        }
      }
      setActions(false);
    }
  };

  const deleteMataKuliah = async (nim, matkul) => {
    setActions(true)
    try {
      const {status} = await API.deleteMataKuliah(nim,matkul);
      if(status == 200){

      }
    } catch (error) {
      // console.log(error);
    }
    setActions(false);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if(actions == false){
      getMahasiswa(id);
      getMataKuliahList();
      setActions("");

      if(error.length !== 0){
        setTimeout(()=>setError([]),2000)
      }
    }
  }, [actions]);

  authorize();

  
  return (
    <Box
      justify="center"
      align="center"
      minH="100vh"
      bg={useColorModeValue("`gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
        homepage={() => router.push("/")}
      />
      <Center py={6}>
        <Box
          maxW="5xl"
          w="full"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="2xl"
          rounded="lg"
          p={6}
          textAlign="center"
        >
          <Avatar
            size="2xl"
            name={mahasiswa.nama}
            alt="Avatar Alt"
            mb={4}
            pos="relative"
          />
          <Heading fontSize="2xl" fontFamily="body">
            {mahasiswa.nama}
          </Heading>
          <Text fontWeight={600} color="gray.500" mb={4}>
            {mahasiswa.nim}
          </Text>
          {error.length !== 0 &&
            error.map((e)=>(
              <Text color={'red'} key={e}>{e}</Text>
            ))}
          <form onSubmit={addMataKuliah}>
            <FormControl p={8}>
              <InputGroup>
                <Select
                  placeholder="Pilih Mata Kuliah"
                  icon={<MdArrowDropDown />}
                  value={matakuliahId || ""}
                  onChange={(e) => setMatakuliahId(e.target.value)}
                >
                  {matakuliahList &&
                    matakuliahList.map((mkList) => (
                      <option value={mkList.id} key={mkList.id}>
                        {mkList.nama}
                      </option>
                    ))}
                </Select>
                <Button type="submit" size="md" colorScheme="green" mx={4}>
                  Add
                </Button>
              </InputGroup>
            </FormControl>
          </form>
          <Box
            justifyContent="center"
            alignItems="center"
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            boxShadow="lg"
          >
            {loading ? (<div>loading...</div>) : (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Kode MK</Th>
                    <Th>Mata Kuliah</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {mahasiswa.Matakuliahs && 
                    mahasiswa.Matakuliahs.map(({nama , id : idMatkul}) => (
                      <Tr key={idMatkul}>
                        <Td>{idMatkul}</Td>
                        <Td>{nama}</Td>
                        <Td>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() =>
                              deleteMataKuliah(id, idMatkul)
                            }
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            )}
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export async function getStaticProps({params}) {
  return {
    props: {
      id : params.id,
    }
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export default Detail;
