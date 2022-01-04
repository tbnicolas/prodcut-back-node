module.exports = {
  
  existUserQuery: "SELECT email,password,id,nombre FROM clientes WHERE email = @email"  ,
  createUserQyuery: "INSERT INTO clientes (nombre,email,password) VALUES  (@nombre,@email,@password); SELECT SCOPE_IDENTITY() AS id;",

  getProductsByUserIdQuery: "SELECT nombre,descripcion,id FROM productos WHERE cliente = @cliente",
  createProductQuery: "INSERT INTO productos (nombre,descripcion,cliente) VALUES (@nombre,@descripcion,@cliente)",
  updateProductQuery: " UPDATE productos SET nombre =@nombre, descripcion = @descripcion, cliente= @cliente WHERE id = @id",
  deleteProductQuery: " DELETE productos WHERE id = @id;"
}