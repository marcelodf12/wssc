/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pol.una.py.wssc.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import pol.una.py.wssc.Proveedores;
import pol.una.py.wssc.Productos;

/**
 *
 * @author marcelo
 */
@Stateless
@Path("pol.una.py.wssc.proveedores")
public class ProveedoresFacadeREST extends AbstractFacade<Proveedores> {

    @PersistenceContext(unitName = "pol.una.py_WSSC_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public ProveedoresFacadeREST() {
        super(Proveedores.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Proveedores entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Proveedores entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Proveedores find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @POST
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public void agregarProductos(@PathParam("id") Integer id, Productos p) {

        Proveedores proveedor = super.find(id);

        em.persist(proveedor);
        em.persist(p);
        try {
            proveedor.getProductosCollection().add(p);
        } catch (NullPointerException e) {
            Collection<Productos> c = (Collection<Productos>) new ArrayList<Productos>();
            c.add(p);
            proveedor.setProductosCollection(c);
        }
        try {
            p.getProveedoresCollection().add(proveedor);
        } catch (NullPointerException e) {
            Collection<Proveedores> c = (Collection<Proveedores>) new ArrayList<Proveedores>();
            c.add(proveedor);
            p.setProveedoresCollection(c);
        }

        em.flush();
        System.out.println("Persistido ");
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Proveedores> findAll() {
        return super.findAll();
    }

    @GET
    @Path("productos/{id}")
    @Produces({"application/xml", "application/json"})
    public List<Productos> buscarProductos(@PathParam("id") Integer id) {
        System.out.print(id);
        Proveedores p = super.find(id);
        List<Productos> productos = (List<Productos>) p.getProductosCollection();
        for (Productos x : productos) {
            System.out.print(x.getId());
            System.out.println(x.getNombre());
        }
        return productos;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Proveedores> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
