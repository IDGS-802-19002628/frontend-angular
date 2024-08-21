import { NavItem } from './nav-item/nav-item';

export const navItemsAdmistrador: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },

  {
    displayName: 'Usuarios',
    iconName: '',
    route: '/usuarios',

  },
  
  {
    navCap: 'Inventario',
  },
  {
    displayName: 'Proveedores',
    iconName: '',
    route: '/proveedores',
  },
  {
    displayName: 'Producto',
    iconName: '',
    route: '/productos',
  },
  {
    displayName: 'Categoria',
    iconName: '',
    route: '/categorias',
  },
  {
    displayName: 'producción',
    iconName: '',
    route: '/produccionV2',
  },
  {
    displayName: 'receta',
    iconName: '',
    route: '/receta',
  },

];

