import { Grid, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { Layout } from '../components/layouts/Layout';
import { EntryList } from "@/context/ui/EntryList";


const HomePage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={ 2 }>
        
      <Grid item xs={12} sm={4} >
          <Card sx={{ height: "calc(100vh - 200px)" }}>
            <CardHeader title="Pending"/>
              
              {/* Add task */}
              <EntryList status="pending"/>

          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
        <Card sx={{ height: "calc(100vh - 200px)" }}>
            <CardHeader title="In Progress"/>
            <EntryList status="in-progress"/>
              
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
        <Card sx={{ height: "calc(100vh - 200px)" }}>
            <CardHeader title="Completed"/>
            <EntryList status="completed"/>
              
          </Card>
        </Grid>



      </Grid>


    </Layout>
  )
}




export default HomePage;