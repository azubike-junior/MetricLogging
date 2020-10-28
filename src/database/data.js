const fs = require('fs') 
  
class Repository { 
  constructor(filename) { 
    // Filename where datas are going to store 
    if(!filename) { 
      throw new Error('Filename is required to create a datastore!') 
    } 
      this.filename = filename 
    try { 
      fs.accessSync(this.filename) 
    } catch(err) { 
      fs.writeFileSync(this.filename, '[]') 
    } 
  } 

  async deleteByKey(TimeOfArrival) { 
        const jsonRecords = await  
            fs.promises.readFile(this.filename, { 
            encoding: 'utf8'
        }) 
        const records = JSON.parse(jsonRecords) 
  
        // Filter Records 
        const filteredRecords = records.filter( 
                    record => record.TimeOfArrival !== TimeOfArrival) 
        await fs.promises.writeFile( 
            this.filename, 
            JSON.stringify(filteredRecords, null, 2) 
        ) 
    } 

  async findByKey(key){ 
    const jsonRecords = await  
        fs.promises.readFile(this.filename, { 
      encoding : 'utf8'
    }) 
    const objRecord = JSON.parse(jsonRecords) 
    const requiredRecord =  
      objRecord.filter(record => record.Key === key) 
    return requiredRecord 
  }
  
  // Get all existing records 
  async getAll(){ 
    return JSON.parse( 
      await fs.promises.readFile(this.filename, { 
        encoding : 'utf8'
      }) 
    ) 
  } 
    
  // Create new record 
   async create(attrs){ 
    const records = await this.getAll() 
  
    records.push(attrs) 
    await fs.promises.writeFile( 
      this.filename, 
      JSON.stringify(records, null, 2)    
    ) 
    return attrs 
  } 
} 
  
module.exports = new Repository('datastore.json')