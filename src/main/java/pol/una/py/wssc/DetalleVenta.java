/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pol.una.py.wssc;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author marcelo
 */
@Entity
@Table(name = "detalle_venta")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DetalleVenta.findAll", query = "SELECT d FROM DetalleVenta d"),
    @NamedQuery(name = "DetalleVenta.findById", query = "SELECT d FROM DetalleVenta d WHERE d.id = :id"),
    @NamedQuery(name = "DetalleVenta.findByPrecio", query = "SELECT d FROM DetalleVenta d WHERE d.precio = :precio"),
    @NamedQuery(name = "DetalleVenta.findByCantidad", query = "SELECT d FROM DetalleVenta d WHERE d.cantidad = :cantidad")})
public class DetalleVenta implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "precio")
    private Integer precio;
    @Column(name = "cantidad")
    private Integer cantidad;
    @JoinColumn(name = "fk_venta", referencedColumnName = "id")
    @ManyToOne
    private Ventas fkVenta;
    @JoinColumn(name = "fk_producto", referencedColumnName = "id")
    @ManyToOne
    private Productos fkProducto;

    public DetalleVenta() {
    }

    public DetalleVenta(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Ventas getFkVenta() {
        return fkVenta;
    }

    public void setFkVenta(Ventas fkVenta) {
        this.fkVenta = fkVenta;
    }

    public Productos getFkProducto() {
        return fkProducto;
    }

    public void setFkProducto(Productos fkProducto) {
        this.fkProducto = fkProducto;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DetalleVenta)) {
            return false;
        }
        DetalleVenta other = (DetalleVenta) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "pol.una.py.wssc.DetalleVenta[ id=" + id + " ]";
    }
    
}
