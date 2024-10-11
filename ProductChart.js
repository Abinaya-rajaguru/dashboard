import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

function ProductChart({ products }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'pie', // You can change this to 'bar', 'line', etc.
      data: {
        labels: products.map(product => product.name),
        datasets: [{
          label: 'Stock',
          data: products.map(product => product.stock),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // To control size manually
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [products]);

  return (
    <div style={{ width: '200px', height: '200px' }}> {/* Container to reduce size */}
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ProductChart;
