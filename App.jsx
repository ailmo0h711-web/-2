import React, { useState } from 'react';
import { FaPlus, FaTrash, FaMoon, FaSun } from 'react-icons/fa';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'هاتف ذكي', quantity: 50, price: 2500 },
    { id: 2, name: 'حاسوب محمول', quantity: 25, price: 4500 },
    { id: 3, name: 'طابعة', quantity: 15, price: 1200 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '' });

  const addProduct = () => {
    if (!newProduct.name) return;
    setProducts([...products, { id: Date.now(), name: newProduct.name, quantity: Number(newProduct.quantity), price: Number(newProduct.price) }]);
    setNewProduct({ name: '', quantity: '', price: '' });
    setShowForm(false);
  };

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen ${bgColor}`} dir="rtl">
      <div className={`${cardBg} shadow p-4 flex justify-between items-center`}>
        <h1 className={`text-xl font-bold ${textColor}`}>نظام محاسبي مخزني</h1>
        <div className="flex gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus /> منتج جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className={`${cardBg} p-4 rounded-xl shadow`}>
          <p className="text-gray-500 text-sm">المنتجات</p>
          <p className={`text-2xl font-bold ${textColor}`}>{products.length}</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow`}>
          <p className="text-gray-500 text-sm">إجمالي القطع</p>
          <p className={`text-2xl font-bold ${textColor}`}>{totalItems}</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow`}>
          <p className="text-gray-500 text-sm">قيمة المخزون</p>
          <p className={`text-2xl font-bold ${textColor}`}>{totalValue.toLocaleString()} ج.م</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow`}>
          <p className="text-gray-500 text-sm">متوسط السعر</p>
          <p className={`text-2xl font-bold ${textColor}`}>{Math.round(totalValue / totalItems || 0).toLocaleString()} ج.م</p>
        </div>
      </div>

      <div className={`${cardBg} m-4 rounded-xl shadow overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`font-bold ${textColor}`}>قائمة المنتجات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-right">#</th>
                <th className="p-3 text-right">المنتج</th>
                <th className="p-3 text-right">الكمية</th>
                <th className="p-3 text-right">السعر</th>
                <th className="p-3 text-right">الإجمالي</th>
                <th className="p-3 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3">{product.id}</td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">{product.price.toLocaleString()} ج.م</td>
                  <td className="p-3">{(product.quantity * product.price).toLocaleString()} ج.م</td>
                  <td className="p-3 text-center">
                    <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className={`${cardBg} rounded-xl p-6 w-full max-w-md`} onClick={(e) => e.stopPropagation()}>
            <h2 className={`text-xl font-bold ${textColor} mb-4`}>إضافة منتج جديد</h2>
            <div className="space-y-4">
              <input type="text" placeholder="اسم المنتج" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              <input type="number" placeholder="الكمية" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" value={newProduct.quantity} onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})} />
              <input type="number" placeholder="السعر" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              <div className="flex gap-3">
                <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded-lg flex-1">حفظ</button>
                <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-1">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
