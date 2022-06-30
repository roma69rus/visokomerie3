exports.MainPageProducts = `
  select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.img_path, img.main_image, p.slug, opt.color_slug 
  from product_options opt  
  left join product p  
  on p.id = opt.product_id  
  left join product_options_image img  
  on opt.id = img.option_id  
  where img.main_image = "1" and p.id in  
      (select p.id  
      from product p, product_category pc, products_to_categories ptc  
      where pc.id = ptc.category_id  
      and ptc.product_id = p.id  
      and pc.name = "Брюки") 
  order by opt.po_order`
  
exports.CatalogCategories = `
  select pc.id, pc.name, pc.description 
  from product_category pc order by pc.cat_order
`;

exports.Slider = `select * from slider ORDER BY slide_order`


exports.CatalogAllProducts = `
  select ptc.category_id, po.id as product_id, p.name, po.product_color, p.price + po.price_increase as price, poi.img_path, p.slug, po.color_slug 
  from product p 
  left join products_to_categories ptc 
  on ptc.product_id = p.id 
  left join product_options po 
  on po.product_id = p.id 
  left join product_options_image poi 
  on poi.option_id = po.id 
  where po.price_increase is not null and poi.main_image = "1" 
`;

exports.Product = 
  `
  select po.product_id, po.id as option_id, p.name, p.price + po.price_increase as price, po.product_color, po.description, p.sizetable_path, po.color_slug 
  from product_options po 
  left join product p 
  on po.product_id = p.id 
  where po.color_slug = ? and p.slug = ?
  `;

exports.productImages = (name, color) =>{
  const query = `
    select poi.id as image_id, poi.img_path, poi.main_image 
    from product_options po 
    left join product_options_image poi 
    on poi.option_id = po.id 
    left join product p 
    on p.id = po.product_id 
    where po.color_slug = "${color}" and p.slug = "${name}"
  `;
  return query
} ;

  