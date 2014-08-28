/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Wssc = angular.module("Wssc", ['ngRoute']);
Wssc.config(['$routeProvider', function($routeProvider) {
        $routeProvider
                .when('/cliente/alta', {
                    templateUrl: 'clientes/alta.html',
                    controller: 'clienteAltaCtrl'
                })
                .when('/cliente/modificar/:id', {
                    templateUrl: 'clientes/modificacion.html',
                    controller: 'clienteEditarCtrl'
                })
                .when('/cliente/listar', {
                    templateUrl: 'clientes/listado.html',
                    controller: 'clienteListarCtrl'
                })
                .when('/cliente/eliminar/:id', {
                    templateUrl: 'clientes/baja.html',
                    controller: 'clienteEliminarCtrl'
                })




                .when('/proveedor/alta', {
                    templateUrl: 'proveedores/alta.html',
                    controller: 'proveedorAltaCtrl'
                })
                .when('/proveedor/modificar/:id', {
                    templateUrl: 'proveedores/modificacion.html',
                    controller: 'proveedorEditarCtrl'
                })
                .when('/proveedor/listar', {
                    templateUrl: 'proveedores/listado.html',
                    controller: 'proveedorListarCtrl'
                })
                .when('/proveedor/eliminar/:id', {
                    templateUrl: 'proveedores/baja.html',
                    controller: 'proveedorEliminarCtrl'
                })



                .when('/producto/alta', {
                    templateUrl: 'productos/alta.html',
                    controller: 'productoAltaCtrl'
                })
                .when('/producto/modificar/:id', {
                    templateUrl: 'productos/modificacion.html',
                    controller: 'productoEditarCtrl'
                })
                .when('/producto/listar', {
                    templateUrl: 'productos/listado.html',
                    controller: 'productoListarCtrl'
                })
                .when('/producto/eliminar/:id', {
                    templateUrl: 'productos/baja.html',
                    controller: 'productoEliminarCtrl'
                })


                .when('/movimientos/compras/registrar', {
                    templateUrl: 'movimientos/registrar_compra.html',
                    controller: 'compraAltaCtrl'
                })
                .when('/movimientos/compras/listar', {
                    templateUrl: 'movimientos/listar_compras.html',
                    controller: 'comprasListarCtrl'
                })
                .when('/movimientos/ventas/registrar', {
                    templateUrl: 'movimientos/registrar_venta.html',
                    controller: 'ventaAltaCtrl'
                })




                .otherwise({RedirectTo: '/'});
    }]);
Wssc.controller('MainController', ['$scope', function($scope) {
        $scope.greeting = 'Hola!';
    }]);






// CRUD de Clientes
Wssc.controller('clienteAltaCtrl', function($scope, $http, $location) {
    $scope.alta = function() {
        var url = "webresources/pol.una.py.wssc.clientes/";
        newCliente = {nombre: $scope.nombre, ci: $scope.ci, email: $scope.email};
        console.log(newCliente);
        $http.post(url, newCliente);
        $location.path('/cliente/listar');
        $http.get(url)
                .success(function(response) {
                    $scope.clientes = response;
                });
    };
});
Wssc.controller('clienteListarCtrl', function($scope, $http) {
    $http.get("webresources/pol.una.py.wssc.clientes/")
            .success(function(response) {
                $scope.clientes = response;
            });
});
Wssc.controller('clienteEliminarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.clientes/";
    var id = $routeParams.id.toString();
    $http.get(url + id.toString()).success(function(response) {
        cliente = response;
        $scope.nombre = cliente.nombre;
        $scope.id = cliente.id;
    });
    $scope.eliminar = function() {
        $http.delete(url + id);
        $location.path('/');
    };
    $scope.cancelar = function() {
        $location.path('/cliente/listar/');
    };
});
Wssc.controller('clienteEditarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.clientes/";
    var id = $routeParams.id.toString();
    $http.get(url + id).success(function(response) {
        cliente = response;
        $scope.nombre = cliente.nombre;
        $scope.ci = cliente.ci;
        $scope.email = cliente.email;
    });
    $scope.editar = function() {
        newCliente = {id: $routeParams.id, nombre: $scope.nombre, ci: $scope.ci, email: $scope.email};
        console.log(url);
        console.log(newCliente);
        $http.put(url + id, newCliente);
        $location.path('/');
    };
});

// CRUD de Proveedores
Wssc.controller('proveedorAltaCtrl', function($scope, $http, $location) {
    $scope.alta = function() {
        var url = "webresources/pol.una.py.wssc.proveedores/";
        newProveedor = {nombre: $scope.nombre, ci: $scope.ci, email: $scope.email};
        $http.post(url, newProveedor);
        $location.path('/proveedor/listar');
        $http.get(url)
                .success(function(response) {
                    $scope.proveedores = response;
                });
    };
});
Wssc.controller('proveedorListarCtrl', function($scope, $http) {
    $http.get("webresources/pol.una.py.wssc.proveedores/")
            .success(function(response) {
                $scope.proveedores = response;
            });
});
Wssc.controller('proveedorEditarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.proveedores/";
    var id = $routeParams.id.toString();
    console.log(url);
    $http.get(url + id).success(function(response) {
        proveedor = response;
        $scope.nombre = proveedor.nombre;
        $scope.ci = proveedor.ci;
        $scope.email = proveedor.email;
    });
    $scope.editar = function() {
        newProveedor = {id: $routeParams.id, nombre: $scope.nombre, ci: $scope.ci, email: $scope.email};
        console.log(url);
        console.log(newProveedor);
        $http.put(url + id, newProveedor);
        $location.path('/');
    };
});
Wssc.controller('proveedorEliminarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.proveedores/";
    var id = $routeParams.id.toString();
    $http.get(url + id.toString()).success(function(response) {
        proveedor = response;
        $scope.nombre = proveedor.nombre;
        $scope.id = proveedor.id;
    });
    $scope.eliminar = function() {
        $http.delete(url + id);
        $location.path('/');
    };
    $scope.cancelar = function() {
        $location.path('/proveedor/listar/');
    };
});



//CRUD para productos
Wssc.controller('productoAltaCtrl', function($scope, $http, $location) {
    $scope.alta = function() {
        var url = "webresources/pol.una.py.wssc.productos/";
        newProducto = {nombre: $scope.nombre, descripcion: $scope.descripcion, precio: $scope.precio};
        console.log(newProducto);
        $http.post(url, newProducto);
        $location.path('/producto/listar');
        $http.get(url)
                .success(function(response) {
                    $scope.productos = response;
                });
    };
});
Wssc.controller('productoListarCtrl', function($scope, $http) {
    $http.get("webresources/pol.una.py.wssc.productos/")
            .success(function(response) {
                $scope.productos = response;

            });
});
Wssc.controller('productoEliminarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.productos/";
    var id = $routeParams.id.toString();
    $http.get(url + id.toString()).success(function(response) {
        producto = response;
        $scope.nombre = producto.nombre;
        $scope.id = producto.id;
    });
    $scope.eliminar = function() {
        $http.delete(url + id);
        $location.path('/');
    };
    $scope.cancelar = function() {
        $location.path('/producto/listar/');
    };
});
Wssc.controller('productoEditarCtrl', function($scope, $http, $routeParams, $location) {
    var url = "webresources/pol.una.py.wssc.productos/";
    var id = $routeParams.id.toString();
    $http.get(url + id).success(function(response) {

        producto = response;
        $scope.nombre = producto.nombre;
        $scope.descripcion = producto.descripcion;
        $scope.precio = producto.precio;

    });
    $scope.editar = function() {
        newProducto = {id: $routeParams.id, nombre: $scope.nombre, descripcion: $scope.descripcion, precio: $scope.precio};
        console.log(url);
        console.log(newProducto);
        $http.put(url + id, newProducto);
        $location.path('/');
    };
});




// Controladores para compra
Wssc.controller('compraAltaCtrl', function($scope, $http, $location) {
    var url = "webresources/pol.una.py.wssc.proveedores/";
    var productos = [];
    $scope.cantidad = [];
    $scope.precio = [];
    $scope.stock = [];
    var cant_p = 0;
    var proveedor;
    $scope.consultar = function() {
        var consulta = url + "productos/" + $scope.proveedor;
        $scope.productos = {};
        $scope.cantidad = [];
        $scope.precio = [];
        $scope.stock = [];
        $http.get(consulta)
                .success(function(response) {
                    $scope.productos = response;
                    productos = $scope.productos;
                    cant_p = productos.length;
                    $http.get(url + $scope.proveedor).success(function(response) {
                        proveedor = response;
                    });
                    console.log(response);
                });
    };

    $scope.alta = function() {
        var url = "webresources/pol.una.py.wssc.compras/crear";
        var f = new Date();
        var ano = f.getFullYear();
        var mes = f.getMonth();
        var dia = f.getDate();
        var compra = {
            "fecha": ano + "-" + mes + "-" + dia,
            "fkProveedor": proveedor
        };
        var compra_respuesta;
        $http.post(url, compra).success(function(response) {
            console.log("Respuesta");
            console.log(response);
            compra_respuesta = response;
            for (var i = 0; i < cant_p; i++) {
                id = productos[i].id;
                if (typeof ($scope.cantidad[id]) !== 'undefined') {
                    if ($scope.cantidad[id].valueOf() !== 0) {
                        nuevoDetalleCompra = {
                            "cantidad": parseInt($scope.cantidad[id]),
                            "fkProducto": productos[i],
                            "precio": productos[i].precio,
                            "fkCompra": compra_respuesta
                        };
                        dir = "webresources/pol.una.py.wssc.detallecompra/";
                        console.log("Detalles");
                        console.log(nuevoDetalleCompra);
                        $http.post(dir, nuevoDetalleCompra);
                        productos[i].stock =
                                parseInt(productos[i].stock) +
                                parseInt($scope.cantidad[id]);
                        pro = {
                            'id': productos[i].id,
                            'descripcion': productos[i].descripcion,
                            'nombre': productos[i].nombre,
                            'precio': productos[i].precio,
                            'stock': productos[i].stock
                        };
                        console.log("se crear");
                        console.log("webresources/pol.una.py.wssc.productos/" + productos[i].id);
                        console.log(pro);
                        $http.put("webresources/pol.una.py.wssc.productos/" + productos[i].id, productos[i]);
                        $location.path('/');
                    }
                }
            }
        });

    };
});
Wssc.controller('comprasListarCtrl', function($scope, $http) {
    $http.get("webresources/pol.una.py.wssc.compras/")
            .success(function(response) {
                $scope.compras = response;
            });
});

Wssc.controller('ventaAltaCtrl', function($scope, $http, $location) {
    var urlVentas = "webresources/pol.una.py.wssc.ventas/";
    var urlClientes = "webresources/pol.una.py.wssc.clientes/";
    var urlProductos = "webresources/pol.una.py.wssc.productos/";
    $http.get(urlClientes).success(function(response) {
        $scope.clientes = response;
    });
    $http.get(urlProductos).success(function(response) {
        $scope.productos = response;
    });
    $scope.cantidad = [];
    $scope.agregados = [];
    aux = new Array();
    $scope.agregar = function(id, cant, index, precio, p) {
        if (parseInt($scope.productos[index].stock) >= parseInt(cant)) {
            $scope.agregados.push(
                    {
                        'id': id,
                        'cant': cant,
                        'pos': index,
                        'precio': precio,
                        'producto': p
                    });
            $scope.productos[index].stock = parseInt($scope.productos[index].stock) - parseInt(cant);
        }
    };
    $scope.eliminar = function(index) {
        console.log(index);
        pos = $scope.agregados[index].pos;
        $scope.productos[pos].stock =
                parseInt($scope.productos[pos].stock)
                +
                parseInt($scope.agregados[index].cant);
        $scope.agregados.splice(index, 1);

    };
    $scope.venta = function() {
        var url = "webresources/pol.una.py.wssc.ventas/crear";
        var urlDetalle = "webresources/pol.una.py.wssc.detalleventa/";
        var urlProductos = "webresources/pol.una.py.wssc.productos/";
        var urlPago = "webresources/pol.una.py.wssc.pagos/";
        var cliente = $scope.idCliente.split(";");
        var urlClientes = "webresources/pol.una.py.wssc.clientes/" + cliente[0];
        $http.get(urlClientes).success(function(response) {
            clienteObj = response;
            var f = new Date();
            var ano = f.getFullYear();
            var mes = f.getMonth();
            var dia = f.getDate();
            var hoy = ano + "-" + mes + "-" + dia;
            var venta = {
                "fecha": hoy,
                "idCliente": clienteObj
            };
            console.log(venta);
            $http.post(url, venta).success(function(response) {
                venta_respuesta = response;
                cant_v = $scope.agregados.length;
                console.log($scope.agregados);
                console.log(cant_v);
                monto = 0;
                for (var i = 0; i < cant_v; i++) {
                    precio = $scope.agregados[i].precio;
                    cantidad = $scope.agregados[i].cant;
                    monto += parseInt(cantidad) * parseInt(precio);
                }
                pago = {
                    'fkVenta': venta_respuesta,
                    'fecha': hoy,
                    'monto': monto
                };
                aux = $scope.agregados;
                $http.post(urlPago, pago);
                console.log("Pago");
                console.log(pago);
                for (var i = 0; i < cant_v; i++) {
                    cantidad = aux[i].cant;
                    precio = aux[i].precio;
                    nuevoProducto = aux[i].producto;
                    console.log("Respuesta");
                    console.log(response);
                    nuevoDetalle = {
                        'precio': precio,
                        'fkProducto': nuevoProducto,
                        'cantidad': cantidad,
                        'fkVenta': venta_respuesta
                    };
                    console.log(urlDetalle);
                    $http.post(urlDetalle, nuevoDetalle);
                    console.log("Nuevo Detalle");
                    console.log(nuevoDetalle);
                    console.log("Producto Modificado");
                    console.log(nuevoProducto);
                    console.log(urlProductos + nuevoProducto.id);
                    $http.put(urlProductos + nuevoProducto.id, nuevoProducto);
                }


            });
        });
    }
    ;
});