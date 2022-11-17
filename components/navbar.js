import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box px={10}>
      <Flex my={5} h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h2" size="md">
          Mahasiswa Mata Kuliah
        </Heading>

        <Stack spacing={8} alignItems="center">
          <Heading as="h3" size="lg">
            Hard
          </Heading>
        </Stack>

        <Flex gridColumnGap={4} alignItems="center">
          {/* <Text fontSize="lg">Username</Text>
          <Menu m={0}>
            <MenuButton minW={0} rounded="full">
              <Avatar size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  console.log("Menambah Mata Kuliah");
                }}
              >
                Tambah Mata Kuliah
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  console.log("log out");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu> */}
          <Link href="./login">
            <Button>Login</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
