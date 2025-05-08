import React from 'react'

const Reports = () => {
  return (
    <>
    <div className="mt-10">
      <ReceiptsFilters />
      <DataTable
        columns={columns}
        data={receipts || []}
        isLoading={isLoading}
        configuration={{
          manualFiltering: true,
        }}
      />
    </div>
  </>
  )
}

export default Reports