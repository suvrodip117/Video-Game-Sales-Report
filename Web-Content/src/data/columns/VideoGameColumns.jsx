const videoGameColumns = (handleClickUpdate, handleClickDelete) => [
  {
    name: 'ID',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Rank',
    selector: (row) => row.gameRank,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Platform',
    selector: (row) => row.platform,
    sortable: true,
  },
  {
    name: 'Platform Group',
    selector: (row) => row.platformGroup,
    sortable: true,
    minWidth: '140px',
  },
  {
    name: 'Year',
    selector: (row) => row.gameYear,
    sortable: true,
  },
  {
    name: 'Genre',
    selector: (row) => row.genre,
    sortable: true,
  },
  {
    name: 'Publisher',
    selector: (row) => row.publisher,
    sortable: true,
  },
  {
    name: 'Sales (North America)',
    selector: (row) => row.naSales,
    sortable: true,
    minWidth: '170px',
  },
  {
    name: 'Sales (Europe)',
    selector: (row) => row.euSales,
    sortable: true,
    minWidth: '130px',
  },
  {
    name: 'Sales (Japan)',
    selector: (row) => row.jpSales,
    sortable: true,
    minWidth: '120px',
  },
  {
    name: 'Sales (Other)',
    selector: (row) => row.otherSales,
    sortable: true,
    minWidth: '120px',
  },
  {
    name: 'Sales (Global)',
    selector: (row) => row.globalSales,
    sortable: true,
    minWidth: '130px',
  },
  {
    name: 'Action',
    cell: (row) => (
      <div style={{ display: 'flex' }}>
        <button onClick={() => handleClickUpdate(row)} className="btn btn-primary btn-sm rounded-0">
          Update
        </button>
        <button onClick={() => handleClickDelete(row)} className="btn btn-danger btn-sm rounded-0">
          Delete
        </button>
      </div>
    ),
    minWidth: '130px',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default videoGameColumns;
