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
} from "@chakra-ui/react";

const Detail = () => {
  return (
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
          name="Username"
          alt="Avatar Alt"
          mb={4}
          pos="relative"
        />
        <Heading fontSize="2xl" fontFamily="body">
          Username
        </Heading>
        <Text fontWeight={600} color="gray.500" mb={4}>
          195150701111000
        </Text>
        <Text fontWeight={600} color="gray.500" mb={4}>
          Teknologi Informasi (2019)
        </Text>

        <Box
          p={8}
          rounded="lg"
          boxShadow="sm"
          bg={useColorModeValue("white", "gray.700")}
        >
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Kode Mata Kuliah</Th>
                  <Th>Mata Kuliah</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>CIT60029</Td>
                  <Td>Internet Of Things</Td>
                </Tr>

                <Tr>
                  <Td>1</Td>
                  <Td>CIT60029</Td>
                  <Td>Internet Of Things</Td>
                </Tr>

                <Tr>
                  <Td>1</Td>
                  <Td>CIT60029</Td>
                  <Td>Internet Of Things</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Stack mt={5} justifyContent="right" direction="row" spacing={4}>
          <Button
            fontSize="sm"
            rounded="full"
            bg="green.400"
            color="white"
            _hover={{
              bg: "green.500",
            }}
          >
            Edit
          </Button>
          <Button
            fontSize="sm"
            rounded="full"
            bg="red.400"
            color="white"
            _hover={{
              bg: "red.500",
            }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Detail;
