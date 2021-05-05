import {pics} from '../../utils/DataHelper';
import PictureCard from "../../component/Picture/Picutre"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function GalleryScreen(props) {
  const [search, setSearch] = useState('');
  const [filteredStates, setFilteredStates] = useState(pics);
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      const filter = pics.filter(state => {
        return state.name.toLowerCase().includes(search.toLowerCase()) || state.artistName.toLowerCase().includes(search.toLowerCase());
      });
  
      setFilteredStates(filter);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <Grid container spacing={1} xs={12}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">What are you looking for?</InputAdornment>
            }}
          />
        </Grid>
        <Grid item container xs={12} spacing={3} style={{margin: '0 auto'}}>
          {filteredStates && filteredStates.map((value, index)=> 
            <Grid item onClick={() => history.push(`/description/${index}`)}>
                <PictureCard details={value} key={index} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default GalleryScreen;
