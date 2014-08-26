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
                    controller: 'MainController'
                })
                .when('/producto/modificar', {
                    templateUrl: 'productos/modificacion.html',
                    controller: 'MainController'
                })
                .when('/producto/listar', {
                    templateUrl: 'productos/listado.html',
                    controller: 'MainController'
                })
                .when('/producto/eliminar', {
                    templateUrl: 'productos/baja.html',
                    controller: 'MainController'
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
                    controller: 'MainController'
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
                        console.log(proveedor);
                    });
                });
    };

    $scope.alta = function() {
        var url = "webresources/pol.una.py.wssc.compras/";
        var f = new Date();
        var ano = f.getFullYear();
        var mes = f.getMonth();
        var dia = f.getDate();
        var compra = {
            "fecha": ano + "-" + mes + "-" + dia,
            "fkProveedor": proveedor
        };
        for (var i = 0; i < cant_p; i++) {
            id = productos[i].id;
            if (typeof ($scope.cantidad[id]) !== 'undefined') {
                if ($scope.cantidad[id].valueOf() !== 0) {
                    if (productos[i].stock >= $scope.cantidad[id]) {
                        nuevoDetalleCompra = {
                            "cantidad": parseInt($scope.cantidad[id]),
                            "fkProducto": productos[i],
                            "precio": productos[i].precio,
                            "fkCompra":compra
                        };
                    console.log(nuevoDetalleCompra);
                    dir = "webresources/pol.una.py.wssc.detallecompra/";
                    $http.post(dir, nuevoDetalleCompra);
                    }
                }
            }
        }
        console.log(compra);
        $http.post(url, compra);
    };
});
Wssc.controller('comprasListarCtrl', function($scope, $http) {
    $http.get("webresources/pol.una.py.wssc.compras/")
            .success(function(response) {
                $scope.compras = response;
            });
});