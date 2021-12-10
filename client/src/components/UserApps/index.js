import MaterialTable from 'material-table'
import { Container } from '@mui/material'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Table2() {
    const data = [
        { appName: 'My App 1', port: '8080', state: 'Running' },
        { appName: 'My App 2', port: '80', state: 'Stopped' },
        { appName: 'My App 3', port: '443', state: 'Running' },
        { appName: 'My App 4', port: '8081', state: 'Running' },
        { appName: 'My App 5', port: '8080', state: 'Stopped' }
    ]

    const details = {
        'My App 1': 'These are some of the details for application one',
        'My App 2': 'These are some of the details for application two',
        'My App 3': 'These are some of the details for application three',
        'My App 4': 'These are some of the details for application four',
        'My App 5': 'These are some of the details for application five'
    }

    const columns = [
        { title: 'App Name', field: 'appName' },
        { title: 'Port', field: 'port' },
        { title: 'State', field: 'state' }
    ]

    return (
        <Container
            sx={{
                marginTop: '10%',
            }}
        >
            <MaterialTable
                title="Your Apps"
                data={data}
                columns={columns}
                icons={tableIcons}
                options={{
                    paging: false,
                    grouping: true,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    rowStyle: rowData => ({
                        backgroundColor: (rowData.tableData.id % 2 == 0) ? '#EEE' : '#FFF'
                    })
                }}
                detailPanel={rowData => {
                    return (
                        <p>Some details</p>
                    )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                console.log("hello")
                                resolve();
                            }, 1000)
                        })
                    }
                }}
            />
        </Container>
    )
}

export default Table2