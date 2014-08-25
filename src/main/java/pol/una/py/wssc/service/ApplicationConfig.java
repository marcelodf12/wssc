/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pol.una.py.wssc.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author marcelo
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(pol.una.py.wssc.service.ClientesFacadeREST.class);
        resources.add(pol.una.py.wssc.service.ComprasFacadeREST.class);
        resources.add(pol.una.py.wssc.service.DetalleCompraFacadeREST.class);
        resources.add(pol.una.py.wssc.service.DetalleVentaFacadeREST.class);
        resources.add(pol.una.py.wssc.service.PagosFacadeREST.class);
        resources.add(pol.una.py.wssc.service.ProductosFacadeREST.class);
        resources.add(pol.una.py.wssc.service.ProveedoresFacadeREST.class);
        resources.add(pol.una.py.wssc.service.VentasFacadeREST.class);
    }
    
}
