import { useState } from "react";

import {
  Flex,
  Box,
  Stack,
  Text,
  Input,
  Button,
  Heading,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  useColorModeValue,
  Link,
  Icon,
} from "@chakra-ui/react";

import { BiIdCard, BiLockAlt, BiShow, BiHide, BiUser } from "react-icons/bi";

import { MdArrowDropDown } from "react-icons/md";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [prodi, setProdi] = useState("");

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("nim: ", nim);
    console.log("nama: ", nama);
    console.log("prodi: ", prodi);
    console.log("angkatan: ", angkatan);
    console.log("password: ", password);
  };

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" minW="md" maxW="lg" py={12} px={6}>
        <Heading textAlign="center" fontSize="4xl">
          Register an account
        </Heading>

        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={BiIdCard} w="6" h="6" color="gray.300" />
                    }
                  />
                  <Input
                    type="text"
                    placeholder="NIM"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon as={BiUser} w="6" h="6" color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Select
                    placeholder="Prodi"
                    icon={<MdArrowDropDown />}
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                  >
                    <option value="Teknologi Informasi">
                      Teknologi Informasi
                    </option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Pendidikan Teknologi Informasi">
                      Pendidikan Teknologi Informasi
                    </option>
                    <option value="Teknik Informatika">
                      Teknik Informatika
                    </option>
                    <option value="Teknik Informatika">
                      Teknik Informatika
                    </option>
                    <option value="Teknik Komputer">Teknik Komputer</option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Select
                    placeholder="Angkatan"
                    icon={<MdArrowDropDown />}
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  >
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={BiLockAlt} w="6" h="6" color="gray.300" />
                    }
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h="full">
                    <Button variant="ghost" onClick={handleShowPassword}>
                      {showPassword ? (
                        <Icon as={BiShow} />
                      ) : (
                        <Icon as={BiHide} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  value="submit"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  Already have account?{" "}
                  <Link color="blue.400" href="./login">
                    login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
