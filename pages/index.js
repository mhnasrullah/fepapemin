import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Thead,
  useColorModeValue,
  Link,
  Spinner,
} from "@chakra-ui/react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
// import backend from "../api/backend";
import { useRouter } from "next/router";
import API from '../utils/endpoints'
import authorize from "../utils/authorize";

export default function Home() {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [user, setUser] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const getAllMahasiswa = async () => {
    try {
      setLoading(true)
      const {data : {mahasiswa}} = await API.getAllMahasiswa();
      setMahasiswas(mahasiswa);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if(error.response != undefined){
        const {response : {status}} = error
        if(status == 403){
          setError("Authorize first")
        }
      }
    }
  };

  const getUserProfile = async () => {
    try {
      const {data : {mahasiswa}} = await API.getProfileMahasiswa();
      setUser(mahasiswa)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login")
  };

  authorize();

  useEffect(() => {
    getAllMahasiswa();
    getUserProfile();
    // getUserByToken();
  }, []);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
      />
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        boxShadow="lg"
      >
        <TableContainer>
            
            {error ? (
              <Text
              style={{
                display : "block"
              }}
              textAlign={"center"}
              >{error}</Text>
            ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>NIM</Th>
                  <Th>Nama</Th>
                  <Th>Angkatan</Th>
                  <Th>Prodi</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mahasiswas &&
                  mahasiswas?.map((mahasiswa, index) => (
                    <Tr key={mahasiswa.nim}>
                      <Td>{index + 1}</Td>
                      <Td>{mahasiswa.nim}</Td>
                      <Td>{mahasiswa.nama}</Td>
                      <Td>{mahasiswa.angkatan}</Td>
                      <Td>{mahasiswa.Prodi ? mahasiswa.Prodi.nama : "unset"}</Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => {
                            router.push(`/users/${mahasiswa.nim}`);
                          }}
                        >
                          Detail
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            )}
            {loading && (
              <div style={{
                paddingTop : 6,
                display : 'flex',
                justifyContent : 'center'
              }}>
                <Spinner/>
              </div>
            )}
        </TableContainer>
      </Box>
    </Box>
  );
}
