const func = async () => {
    'use strict';
    console.log('code loaded')
        if (window.location.href.includes('PG_QAIME_1')){
            debugger
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/handsontable@12.1.2/dist/handsontable.full.min.js'
            script.defer = true
            document.head.appendChild(script)
            const css = document.createElement('link')
            css.rel = 'stylesheet'
            css.type = 'text/css'
            css.href = 'https://cdn.jsdelivr.net/npm/handsontable@12.1.2/dist/handsontable.full.min.css'
            document.head.appendChild(css)
            const uploadButton = document.createElement('button');
            uploadButton.type = 'button'
            uploadButton.id = 'uploadToPage'
            uploadButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            uploadButton.style.marginLeft = '200px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-down16';
             b.appendChild(i);
             uploadButton.appendChild(b)
             uploadButton.appendChild(document.createTextNode('E-qaiməyə əlavə etmək.'))
            }

            const firstPageButton = document.createElement('button');
            firstPageButton.type = 'button'
            firstPageButton.id = 'firstPage'
            firstPageButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            firstPageButton.style.marginLeft = '200px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-left16';
             b.appendChild(i);
             firstPageButton.appendChild(b)
             firstPageButton.appendChild(document.createTextNode('Birinci səhifə'))
            }

            const secondPageButton = document.createElement('button');
            secondPageButton.type = 'button'
            secondPageButton.id = 'secondPage'
            secondPageButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            secondPageButton.style.marginLeft = '5px'
            { const b = document.createElement('b')
            const i = document.createElement('i');
             i.className = 'icon-arrow-right16';
             b.appendChild(i);
             secondPageButton.appendChild(b)
             const textNode = document.createTextNode('İkinci səhifə')
             secondPageButton.appendChild(textNode)
            }
            const docoid = sessionStorage.getItem("docoidToCopy")
            if(document.querySelector("#sidebarMenu > li.active > ul > li:nth-child(1) > a")){
                document.querySelector("#sidebarMenu > li.active > ul > li:nth-child(1) > a").addEventListener('click',()=>{sessionStorage.removeItem('docoidToCopy')})
            }
            window.addEventListener('beforeunload',e=>beforeUnload(e))
            function beforeUnload(e){
                if(!e.target.activeElement.href.includes('PG_QAIME_1')){
                    sessionStorage.removeItem('docoidToCopy')
                }
            }
            let hot;
            for (let a = 0; a <= 1000; a++){
                try{
                    firstPageButton.addEventListener('click',firstPageEvent);
                    uploadButton.addEventListener('click',uploadData);
                    secondPageButton.addEventListener('click',secondPageEvent);
                    firstPageEvent();
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(uploadButton);
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(firstPageButton);
                    document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").appendChild(secondPageButton);
                    try {
                        if (docoid){copyDocument()}
                    } catch(error){
                        sessionStorage.removeItem('docoidToCopy')}
                    break;
                } catch(error) {
                    //console.log(error)
                    await sleep(100)
                }
            };
            async function copyDocument (){
                debugger;
                document.querySelector("#sidebarMenu a[href='/doFlow?doc=PG_QAIME_1']")?.addEventListener('click',()=>{sessionStorage.removeItem("docoidToCopy")})
                const html = await fetch("https://qaime.e-taxes.gov.az/service/eqaime.printQaime", {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "docOidList%5B%5D=" + docoid,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(response =>response.json())
                .then(response=>b64DecodeUnicode(response.htmlList[0]))
                .then(response=>new DOMParser().parseFromString(response,'text/html'))
                if (html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent && html.querySelector('body > p:nth-child(4) > span:nth-child(5)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent){
                    sessionStorage.removeItem('docoidToCopy')
                    //return ''
                }
                document.querySelector("#customerVoen").value = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10)!==document.querySelector("#leftMenuOrgId").textContent?html.querySelector('body > p:nth-child(4) > span:nth-child(2)').textContent.substring(0,10):html.querySelector('body > p:nth-child(4) > span:nth-child(5)').textContent.substring(0,10)
                document.querySelector("#getCustomerVoen > i").click()
                document.querySelector("#customerNotes").textContent = html.querySelector('body > p:nth-child(4) > span:nth-child(8)').textContent
                document.querySelector("#customerNotes2").textContent = html.querySelector('body > p:nth-child(4) > span:nth-child(11)').textContent
                for (let i = 6; i <= html.querySelector('body > table > tbody').childNodes.length-2;i++){
                    let product = html.querySelector('body > table > tbody').childNodes[i]
                    document.querySelector("#addRow").click();
                    const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                    lastChild.children[2].querySelector('input').value = product.childNodes[1].textContent.substring(11,100)
                    lastChild.children[18].querySelector('input').value = product.childNodes[1].textContent.substring(0,10)
                    lastChild.children[3].querySelector('input').value = product.childNodes[2].textContent
                    lastChild.children[4].querySelector('input').value = product.childNodes[3].textContent
                    lastChild.children[5].querySelector('input').value = product.childNodes[4].textContent
                    lastChild.children[6].querySelector('input').value = product.childNodes[5].textContent
                    lastChild.children[7].querySelector('input').value = Round(Number(lastChild.children[5].querySelector('input').value)*Number(lastChild.children[6].querySelector('input').value),4);
                    lastChild.children[8].querySelector('input').value = product.childNodes[7].textContent
                    lastChild.children[9].querySelector('input').value = product.childNodes[8].textContent
                    lastChild.children[10].querySelector('input').value = lastChild.children[7].querySelector('input').value
                    lastChild.children[11].querySelector('input').value = Number(product.childNodes[11].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[12].querySelector('input').value = Number(product.childNodes[12].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[13].querySelector('input').value = Number(product.childNodes[13].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[14].querySelector('input').value = Number(product.childNodes[14].textContent)>0?lastChild.children[7].querySelector('input').value:'0.00'
                    lastChild.children[15].querySelector('input').value = Round(Number(lastChild.children[11].querySelector('input').value)*0.18,4)
                    lastChild.children[16].querySelector('input').value = product.childNodes[16].textContent
                    lastChild.children[17].querySelector('input').value = Round(Number(lastChild.children[7].querySelector('input').value)+Number(lastChild.children[15].querySelector('input').value),4)
                }
                document.querySelector("#totalAmount").value = roundToTwo(roundToFour(total6()));
                document.querySelector("#totalExcise").value = roundToTwo(roundToFour(total8()));
                document.querySelector("#totalVat").value = roundToTwo(roundToFour(total9()));
                document.querySelector("#totalVatIn").value = roundToTwo(roundToFour(total10()));
                document.querySelector("#totalVatOut").value = roundToTwo(roundToFour(total11()));
                document.querySelector("#totalVatFree").value = roundToTwo(roundToFour(total12()));
                document.querySelector("#totalVatZero").value = roundToTwo(roundToFour(total13()));
                document.querySelector("#totalPay").value = roundToTwo(roundToFour(total14()));
                document.querySelector("#totalRoad").value = roundToTwo(roundToFour(total15()));
                document.querySelector("#totalPrice").value = roundToTwo(roundToFour(total16()));
            }
            await sleep(500)
            //             for (let i = 0; i < 100; i++){
            //                 try {
            //                     [...document.querySelectorAll("#data_form table > tbody > tr")].forEach(tr=>{
            //                         tr.querySelector("td:nth-child(6) > input").addEventListener('change', (e)=>handleChange(e))
            //                         tr.querySelector("td:nth-child(7) > input").addEventListener('change', (e)=>handleChange(e))
            //                         tr.querySelector("td:nth-child(10) > input").addEventListener('change', (e)=>handleChange(e))
            //                     })
            //                     document.querySelector("#addRow").addEventListener('click', async (e)=>{
            //                         await sleep(10)
            //                         document.querySelector("#data_form table > tbody > tr:last-child > td:nth-child(6) > input").addEventListener('change', (e)=>handleChange(e))
            //                         document.querySelector("#data_form table > tbody > tr:last-child > td:nth-child(7) > input").addEventListener('change', (e)=>handleChange(e))
            //                         document.querySelector("#data_form table > tbody > tr:last-child > td:nth-child(10) > input").addEventListener('change', (e)=>handleChange(e))
            //                     })
            //                     break
            //                 } catch(error){
            //                 }
            //             }

            //             async function handleChange (e) {
            //                 await sleep(10)
            //                 const tr = e.target.parentNode.parentNode
            //                 const value = tr.querySelector('td:nth-child(11)>input').value
            //                 if (Number(tr.querySelector('td:nth-child(13)>input').value) !=0 ){
            //                     tr.querySelector('td:nth-child(13)>input').value = value
            //                 } else if (Number(tr.querySelector('td:nth-child(14)>input').value) !=0 ){
            //                     tr.querySelector('td:nth-child(14)>input').value = value;
            //                 } else if (Number(tr.querySelector('td:nth-child(15)>input').value) !=0 ){
            //                     tr.querySelector('td:nth-child(15)>input').value = value
            //                 }else {
            //                     tr.querySelector('td:nth-child(12)>input').value = value
            //                     tr.querySelector('td:nth-child(16)>input').value = Math.round(value*0.18*10000)/10000
            //                 }
            //                 // console.log(e)
            //             }
            async function firstPageEvent(){
                if (document.querySelector('div#page2')){
                    document.querySelector('div#page2').style.display = 'none'
                }
                if (document.querySelector('div#page1')){
                    document.querySelector('div#page1').style.display = 'block'
                } else {
                    const div = document.createElement('div')
                    div.id = 'page1'
                    document.querySelector("#data_form > div:nth-child(9)")?.appendChild(div);
                    const container = document.querySelector('div#page1');
                    hot = new Handsontable(container, {
                        dataSchema: {defaultText:'18%',VATIncluded:'+'},
                        startCols:21,
                        startRows:10,
                        minRows:10,
                        //minSpareRows:1,
                        rowHeaders: true,
                        colWidths:[40,50,100,100,70,70,70,70,70,70,70,70,70,70,70,70,70,70,100],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['№','Seçim','1. Malın (işin, xidmətin) kodu','1. Malın (işin, xidmətin) adı','2. Barkod','3. Ölçü vahidi','4. Miqdarı, həcmi','5. Vahidin buraxılış qiyməti (manatla)','6. Cəmi (manatla) (4*5)','7. Aksiz Dərəcəsi (%)',
                                     '8. Aksiz Məbləği manatla','9. Cəmi (6+8)','10. ƏDV-yə cəlb edilən','11. ƏDV-yə cəlb edilməyən','12. ƏDV-dən azad olunan','13. ƏDV-yə 0 dərəcə ilə cəlb edilən','14. ƏDV məbləği manatla (10*0.18)','15. Yol Vergisi',
                                     '16. Yekun məbləğ (manatla) (9+14+15)','ƏDV dərəcəsi','Qiymətlərə ƏDV daxildir.'],
                        columns:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{type:'dropdown',data:'defaultText',source:['18%','','-','0']},{type:'dropdown',source:['+',''],data:'VATIncluded'}],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });

                }

            };
            async function secondPageEvent(){
                if (document.querySelector('div#page1')){
                    document.querySelector('div#page1').style.display = 'none'
                }
                if (document.querySelector('div#page2')){
                    document.querySelector('div#page2').style.display = 'block'
                } else {
                    const div = document.createElement('div')
                    div.id = 'page2'
                    document.querySelector("#data_form > div:nth-child(9)").appendChild(div);
                    const container = document.querySelector('div#page2');
                    Handsontable.renderers.registerRenderer('vatRenderer', vatRenderer);
                    hot = new Handsontable(container, {
                        dataSchema: {defaultText:'18%',VATIncluded:document.querySelector("#leftMenuOrgId").textContent==='1503047971'?'':'+'},
                        startCols:7,
                        startRows:10,
                        minRows:10,
                        //minSpareRows:1,
                        minColumns:7,
                        rowHeaders: true,
                        colWidths:[200,200,200,200,200,200,200,200],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['1. Malın (işin, xidmətin) kodu','2. Malın (işin, xidmətin) adı','3. Ölçü vahidi','4. Miqdarı, həcmi','5. Vahidin buraxılış qiyməti (manatla)','6. Cəmi (manatla) (4*5)','7. ƏDV dərəcəsi','8. Qiymətlərə ƏDV daxildir.'],
                        columns:[{},{},{},{},{},{},
                                 {
                                     type:'dropdown',
                                     data:'defaultText',
                                     //renderer:'vatRenderer',
                                     source:['18%','','-','0']
                                 },
                                 {type:'dropdown',source:['+',''],data:'VATIncluded'}
                                ],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });
                    function vatRenderer(hotInstance, td, row, column, prop, value, cellProperties){
                        Handsontable.renderers.BaseRenderer.apply(this, arguments);
                        if (!value){
                            //console.log(hotInstance, td, row, column, prop, value, cellProperties)
                            //td.textContent = '18%'
                            //td.childNodes[1].textContent = '18%'
                        }
                    };
                }
            }

            function uploadData(){
                if (document.querySelector('div#page1')?.style?.display!=='none'){
                    for (let i = 0;i<hot.countRows();i++){
                        if (hot.getDataAtCell(i,3)){
                            document.querySelector("#addRow").click();
                            const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                            lastChild.children[2].querySelector('input').value = hot.getDataAtCell(i,3)
                            lastChild.children[18].querySelector('input').value = hot.getDataAtCell(i,2)
                            lastChild.children[3].querySelector('input').value = hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[4].querySelector('input').value = hot.getDataAtCell(i,5)
                            lastChild.children[5].querySelector('input').value = hot.getDataAtCell(i,6)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[6].querySelector('input').value = hot.getDataAtCell(i,7)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[7].querySelector('input').value = hot.getDataAtCell(i,8)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[8].querySelector('input').value = hot.getDataAtCell(i,9)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[9].querySelector('input').value = hot.getDataAtCell(i,10)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[10].querySelector('input').value = hot.getDataAtCell(i,11)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[11].querySelector('input').value = hot.getDataAtCell(i,12)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[12].querySelector('input').value = hot.getDataAtCell(i,13)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[13].querySelector('input').value = hot.getDataAtCell(i,14)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[14].querySelector('input').value = hot.getDataAtCell(i,15)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[15].querySelector('input').value = hot.getDataAtCell(i,16)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[16].querySelector('input').value = hot.getDataAtCell(i,17)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                            lastChild.children[17].querySelector('input').value = hot.getDataAtCell(i,18)?.replace(/\,/g,'.')?.replace(/\s/g,'')
                        }}
                } else if (document.querySelector('div#page2')?.style?.display!=='none'){
                    for (let i = 0;i<hot.countRows();i++){
                        if (hot.getDataAtCell(i,1)){
                            document.querySelector("#addRow").click();
                            const lastChild = document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div.col-md-12.mt-20 > div > table > tbody").lastChild;
                            if (hot.getDataAtCell(i,0)){
                                lastChild.children[18].querySelector('input').value = hot.getDataAtCell(i,0)
                            } else {
                                lastChild.children[18].querySelector('input').value = (document.querySelector("#leftMenuOrgId").textContent==='1503047971'?'9933111300':'9946382900')
                            }
                            lastChild.children[2].querySelector('input').value = hot.getDataAtCell(i,1)
                            lastChild.children[4].querySelector('input').value = hot.getDataAtCell(i,2)
                            lastChild.children[5].querySelector('input').value = hot.getDataAtCell(i,3)?.replace(/\s/g,'')?.replace(/\,/g,'.')
                            if (hot.getDataAtCell(i,6)?.includes('18%') && hot.getDataAtCell(i,7)?.includes('+')){
                                lastChild.children[6].querySelector('input').value = Round(Number(hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,''))/(1+0.18),4)
                            } else {
                                lastChild.children[6].querySelector('input').value = Round(Number(hot.getDataAtCell(i,4)?.replace(/\,/g,'.')?.replace(/\s/g,'')),4)
                            }
                            lastChild.children[7].querySelector('input').value = Round(Number(lastChild.children[5].querySelector('input').value)*Number(lastChild.children[6].querySelector('input').value),4);
                            lastChild.children[8].querySelector('input').value = '0.00'
                            lastChild.children[9].querySelector('input').value = '0.00'
                            lastChild.children[10].querySelector('input').value = lastChild.children[7].querySelector('input').value
                            if (hot.getDataAtCell(i,6)?.includes('18%')){
                                lastChild.children[11].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else if(hot.getDataAtCell(i,6)?.includes('0')) {
                                lastChild.children[14].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else if(hot.getDataAtCell(i,6)?.includes('-')) {
                                lastChild.children[12].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            } else {
                                lastChild.children[13].querySelector('input').value = lastChild.children[10].querySelector('input').value
                            }
                            lastChild.children[15].querySelector('input').value = Round(Number(lastChild.children[11].querySelector('input').value)*0.18,4)
                            lastChild.children[16].querySelector('input').value = 0
                            lastChild.children[17].querySelector('input').value = Round(Number(lastChild.children[7].querySelector('input').value)+Number(lastChild.children[15].querySelector('input').value),4)
                        }}
                }
                document.querySelector("#totalAmount").value = roundToTwo(roundToFour(total6()));
                document.querySelector("#totalExcise").value = roundToTwo(roundToFour(total8()));
                document.querySelector("#totalVat").value = roundToTwo(roundToFour(total9()));
                document.querySelector("#totalVatIn").value = roundToTwo(roundToFour(total10()));
                document.querySelector("#totalVatOut").value = roundToTwo(roundToFour(total11()));
                document.querySelector("#totalVatFree").value = roundToTwo(roundToFour(total12()));
                document.querySelector("#totalVatZero").value = roundToTwo(roundToFour(total13()));
                document.querySelector("#totalPay").value = roundToTwo(roundToFour(total14()));
                document.querySelector("#totalRoad").value = roundToTwo(roundToFour(total15()));
                document.querySelector("#totalPrice").value = roundToTwo(roundToFour(total16()));

            }

            const observer = new MutationObserver(observerFunction)
            function observerFunction(mutations){
                for (const mutation of mutations){
                    for (const addedNode of mutation.addedNodes){
                        if (addedNode.id==='btnRegister'){
                            try{
                                //console.log(document.querySelector("#data_form > div:nth-child(9)"));
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(firstPageButton);
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(uploadButton);
                                document.querySelector("#data_form > div.col-md-12 > div.panel.panel-white > div.panel-body > div:nth-child(1)").removeChild(secondPageButton);
                                document.querySelector("#data_form > div:nth-child(9)").removeChild(document.querySelector('#page1'));
                                document.querySelector("#data_form > div:nth-child(9)").removeChild(document.querySelector('#page2'));
                                //console.log(document.querySelector("#data_form > div:nth-child(9)"));
                            } catch {}
                        }

                    }
                }
            }

            const options = {attributes:true,characterData:true,childList:true,subtree:true}
            observer.observe(document.querySelector("#regContent"),options)
        }
        if (window.location.href.includes('qaime.e-taxes.gov.az/')){
            let token = document.cookie.match(/\stoken=(.*?);/)[1]
            try {
                let li = document.createElement('li')
                document.querySelector("#sidebarMenu").appendChild(li)
                li.textContent = token;
                li.style.wordWrap = 'break-word'
                li.style.color = 'transparent'
            } catch(error) {
            }
            console.log(token)
            //let data = JSON.stringify({token})
            //             fetch('http://127.0.0.1:2222/import',{
            //                 "headers": {
            //                     "accept": "application/json, */*; q=0.01",
            //                     "content-type": "application/json; charset=UTF-8"
            //                 },
            //                 "body": data,
            //                 "method": "POST",
            //                 "mode": "no-cors",
            //             })
        }
        if (['getDocList','getAllDocList','getDrafts'].some(x=>window.location.href.includes(x))){

            let interval = 15 * 60 * 1000;
            function reloadPage(){
                window.location.reload()
                setTimeout(reloadPage, interval)
            }
            //setTimeout(reloadPage, interval)

            {
                const script = document.createElement('script')
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
                script.defer = true
                document.head.appendChild(script)
            }
            const printButton = document.createElement('button');
            printButton.type = 'button';
            printButton.style.borderRadies = '3px';
            printButton.style.marginRight = '10px';
            //printButton.textContent = 'Cədvələ çıxart';
            printButton.id = 'printList';
            printButton.className = 'btn btn-xs bg-teal-800 pull-right';
            if (sessionStorage.getItem("docoidToCopy")){sessionStorage.removeItem("docoidToCopy")}
            {
                const i = document.createElement('i');
                i.className = 'icon-table2 position-left';
                printButton.appendChild(i)
                printButton.appendChild(document.createTextNode('Cədvələ çıxart'))
            }
            const showInfoButton = document.createElement('button')
            showInfoButton.type = 'button'
            showInfoButton.className = 'btn btn-xs bg-teal-800 pull-right'
            showInfoButton.id = 'userChecker'
            showInfoButton.style.marginRight = '10px'
            showInfoButton.checked = false;
            showInfoButton.addEventListener('click',(e)=>toggleCheckbox(e.target))
            const checkbox = document.createElement('i');
            checkbox.className = 'icon-minus3 position-left';
            showInfoButton.appendChild(checkbox)
            showInfoButton.appendChild(document.createTextNode('Qaimənin məlumatlarını göstər.'))
            checkbox.addEventListener('click',(e)=>toggleCheckbox(showInfoButton))
            const observer = new MutationObserver(mutations=>updateTable(mutations))
            const options = {attributes:true,characterData:true,childList:true,subtree:true}
            observer.observe(document.querySelector("body > div.page-container"),options)
            addCopyOp()
            function updateTable(mutations){
                for (let mutation of mutations){
                    if(mutation?.target?.querySelector('div.table-responsive')){
                        try{
                            addCopyOp()
                        } catch(error){
                            //console.log(error)
                        }
                    }
                }
            }
            async function copyDocument(e){
                const row = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
                sessionStorage.setItem("docoidToCopy", row.dataset.docoid)
                //window.location = 'https://qaime.e-taxes.gov.az/doFlow?doc=PG_QAIME_1'
                window.open('https://qaime.e-taxes.gov.az/doFlow?doc=PG_QAIME_1')
            }

            function addCopyOp(){
                let children = document.querySelector("#default-datatable > tbody")?.children
                for(let i = 0; i < children?.length; i++){
                    const child = children[i]
                    let button = child.querySelector('button.chooseOperation')
                    const ul = child.querySelector('ul.dropdown-menu')
                    if (button){
                        const observer = new MutationObserver(observerFunction)
                        function observerFunction(mutations){
                            for (const mutation of mutations){
                                if (mutation.target.className ==='doOperation' && !mutation.target?.parentNode?.parentNode?.querySelector('li a.doCopy')){
                                    try{
                                        const li = document.createElement('li')
                                        const a = document.createElement('a')
                                        a.className = 'doCopy'
                                        //a.href = ''
                                        a.dataset.size = 'large'
                                        a.textContent = 'Sənədi Kopyala'
                                        li.appendChild(a)
                                        ul.appendChild(li)
                                        a.addEventListener('click',e=>copyDocument(e))
                                    } catch {}
                                }
                            }
                        }

                        const options = {attributes:true,characterData:true,childList:true,subtree:true}
                        observer.observe(ul, options)
                    } else {
                        button = document.createElement('button')
                        button.type = 'button'
                        button.className = 'btn bg-teal-800 dropdown-toggle copyDocument'
                        button.dataset.toggle = 'dropdown'
                        button.ariaHasPopup = 'true'
                        button.ariaExpanded = 'false'
                        {const span = document.createElement('span')
                        span.dataset.land = 'tabs.chooseOperation'
                         span.textContent = 'Əməliyyatı seçin'
                         button.appendChild(span)}
                        {const span = document.createElement('span')
                        span.className = 'caret'
                         button.appendChild(span)
                         const li = document.createElement('li')
                         const a = document.createElement('a')
                         a.className = 'doCopy'
                         //a.href = ''
                         a.dataset.size = 'large'
                         a.textContent = 'Sənədi Kopyala'
                         li.appendChild(a)
                         ul.appendChild(li)
                         a.addEventListener('click',e=>copyDocument(e))
                        }
                        button.addEventListener('click',()=>{
                            if (button.ariaExpanded==='true'){
                                button.ariaExpanded = 'false'
                                ul.style.display = 'none'
                            } else {
                                button.ariaExpanded = 'true'
                                ul.style.display = 'block'}
                        })

                        child.querySelector('div.btn-group').insertBefore(button,child.querySelector('ul.dropdown-menu'))
                    }

                }
            }
            function toggleCheckbox (target){
                if (target.checked){
                    target.checked = false;
                    checkbox.className = 'icon-minus3 position-left'
                } else {
                    target.checked = true;
                    checkbox.className = 'icon-plus3 position-left'
                }
            }
            async function append(count=1000){
                try{
                    document.querySelector("#filterButton").parentElement.appendChild(printButton)
                    printButton.addEventListener('click',printList)
                    document.querySelector("#filterButton").parentElement.appendChild(showInfoButton);
                    const date = new Date()
                    const table = document.querySelector("#default-datatable")
                    document.querySelector("#startDate").value = new Date(date.getFullYear(),date.getMonth(),1,0,0).toLocaleDateString("ru") + ' 00:00'
                } catch {
                    if (count>0){
                        await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                        append(count-1)
                    }
                }}
            append();


        } else if (window.location.href.includes('PG_REFUND')) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/handsontable@12.1.2/dist/handsontable.full.min.js'
            script.defer = true
            document.head.appendChild(script)
            const css = document.createElement('link')
            css.rel = 'stylesheet'
            css.type = 'text/css'
            css.href = 'https://cdn.jsdelivr.net/npm/handsontable@12.1.2/dist/handsontable.full.min.css'
            document.head.appendChild(css)
            const div = document.createElement('div')
            div.id = 'refund'
            div.className = 'col-md-12'
            const uploadButton = document.createElement('button');
            uploadButton.type = 'button'
            uploadButton.id = 'uploadToPage'
            uploadButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            uploadButton.style.margin = '15px 50% 10px 45%'
            const b = document.createElement('b')
            const i = document.createElement('i');
            i.className = 'icon-arrow-down16';
            b.appendChild(i);
            uploadButton.appendChild(b)
            uploadButton.appendChild(document.createTextNode('Əvəzləşməyə əlavə etmək.'))
            const selectAllButton = document.createElement('button')
            selectAllButton.type = 'button'
            selectAllButton.id = 'selectAll'
            selectAllButton.className = 'btn btn-xs bg-teal-800 btn-labeled'
            {
                const b = document.createElement('b')
                const i = document.createElement('i');
                i.className = 'icon-stack-check';
                b.appendChild(i);
                selectAllButton.appendChild(b)
                selectAllButton.appendChild(document.createTextNode('Hamısını seçmək'))
            }
            {
                const script = document.createElement('script')
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
                script.defer = true
                document.head.appendChild(script)
            }
            selectAllButton.addEventListener('click',e=>toggle(e))
            let hot;
            append();
            async function append(count=1000){
                try{
                    Handsontable;
                    for (let i = 0;i<=3;i++){
                        const cloneNode = document.querySelector("#data_form > div:nth-child(1) > div > div.panel-body").children[i].cloneNode(true)
                        for (let prop of ['id']){
                            for (let child of ['input','select','button']){
                                try{
                                    cloneNode.querySelector(child)[prop] +='-2'
                                } catch(error){
                                }
                            }
                        }

                        document.querySelector("#data_form > div:nth-child(1) > div > div.panel-body").appendChild(cloneNode)
                    }
                    document.querySelector("#packageType2").disabled = false
                    document.querySelector("#packageType2-2").disabled = false
                    document.querySelector("#year").value = new Date().getFullYear()
                    document.querySelector("#year-2").value = new Date().getFullYear()
                    for (let id of ['packageType2','packageType2-2']){
                        const options = document.querySelector(`#${id}`).options;
                        [...options].forEach(x=>x.parentElement.removeChild(x))
                        document.querySelector("[id='packageType2-2']").disabled = false
                        options[0] = new Option('Yanvar','01')
                        options[1] = new Option('Fevral','02')
                        options[2] = new Option('Mart','03')
                        options[3] = new Option('Aprel','04')
                        options[4] = new Option('May','05')
                        options[5] = new Option('İyun','06')
                        options[6] = new Option('İyul','07')
                        options[7] = new Option('Avqust','08')
                        options[8] = new Option('Sentyabr','09')
                        options[9] = new Option('Oktyabr','10')
                        options[10] = new Option('Noyabr','11')
                        options[11] = new Option('Dekabr','12')}
                    document.querySelector("#packageType").value = '01'
                    document.querySelector("#packageType-2").value = '01'
                    document.querySelector("[id='packageType2']").value = '01'
                    document.querySelector("[id='packageType2-2']").value = '12'
                    document.querySelector("[id='packageType-2']").addEventListener('change',(e)=>{
                        const options = document.querySelector("[id='packageType2-2']").options
                        if (e.target.value==='0'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            options[0] = new Option('Seçin','0')
                            document.querySelector("[id='packageType2-2']").disabled = true
                            document.querySelector("[id='packageType2-2']").value = '0'
                        }
                        else if (e.target.value==='01'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            document.querySelector("[id='packageType2-2']").disabled = false
                            options[0] = new Option('Yanvar','01')
                            options[1] = new Option('Fevral','02')
                            options[2] = new Option('Mart','03')
                            options[3] = new Option('Aprel','04')
                            options[4] = new Option('May','05')
                            options[5] = new Option('İyun','06')
                            options[6] = new Option('İyul','07')
                            options[7] = new Option('Avqust','08')
                            options[8] = new Option('Sentyabr','09')
                            options[9] = new Option('Oktyabr','10')
                            options[10] = new Option('Noyabr','11')
                            options[11] = new Option('Dekabr','12')
                            document.querySelector("[id='packageType2-2']").value = '12'

                        }
                        else if (e.target.value==='02'){
                            [...options].forEach(x=>x.parentElement.removeChild(x))
                            document.querySelector("[id='packageType2-2']").disabled = false
                            for (let i = 0;i<=3;i++){
                                options[i] = new Option(i+1,('0'+(i*3+1)).substr(('0'+(i*3+1)).length-2,2))}
                            document.querySelector("[id='packageType2-2']").value = '10'
                        }
                    })
                    document.querySelector("[id='filterButton-2']").textContent = 'Çap et'
                    document.querySelector("[id='filterButton-2']").addEventListener('click',refundList)
                    document.querySelector("#data_form > div:nth-child(2)").appendChild(div)
                    document.querySelector("#data_form > div:nth-child(2)").appendChild(uploadButton)
                    document.querySelector("#data_form > div:nth-child(3) > div > div.panel-body > div:nth-child(1)").appendChild(selectAllButton)
                    hot = new Handsontable(div, {
                        dataSchema: {rowNo:'308'},
                        startCols:6,
                        startRows:10,
                        minRows:5,
                        //minSpareRows:1,
                        rowHeaders: true,
                        colWidths:[100,100,100,100,100,100,1000],
                        autoWrapRow:true,
                        wordWrap:false,
                        autoWrapColumn:true,
                        autoWrapRow:true,
                        dropdownMenu: true,
                        filters: true,
                        manualColumnResize: true,
                        colHeaders: ['№','Sətir Nömrəsi','Qaimənin Seriyası','Qaimənin Nömrəsi','Ödənilmiş ümumi dəyər','Ödənilmiş ƏDV','Nəticə',],
                        columns:[{},{type:'dropdown',data:'rowNo',source:['308','314','316',]},{},{},{},{},{
                            readOnly:true,
                        },],
                        colHeight:'auto',
                        licenseKey: 'non-commercial-and-evaluation',
                    });
                    uploadButton.addEventListener('click',uploadData);
                } catch(error) {
                    //console.log(error)
                    if (count>0){
                        await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                        append(count-1)
                    }
                }}
            async function uploadData(){
                const year = document.querySelector("#year").value
                const month = document.querySelector("#packageType2").value;
                //document.querySelector("#filterButton").click();
                let timeout = 100;
                for (let i = 0; i < hot.countRows(); i++){
                    await sleep(timeout)
                    const rowNo = hot.getSourceDataAtCell(i,1)?.replace(/\s/g,'')
                    const ser = hot.getSourceDataAtCell(i,2)?.replace(/\s/g,'')
                    const No = ('000000' + hot.getSourceDataAtCell(i,3))?.slice(-6).replace(/\s/g,'')
                    let amount = hot.getSourceDataAtCell(i,4)?.replace(/\,/g,'.').replace(/\s/g,'')
                    const vat = Round(Number(amount)*0.18,2)
                    if (!ser || !No){
                        continue;
                    }
                    if (ser.length!==4 && ser.length!==2){
                        hot.setDataAtCell(i,6, 'Qaimənin Seriyası düzgün deyil');
                        continue;
                    }
                    //uploadRefundData(ser, No, amount, vat)
                    //continue
                    async function uploadRefundData(ser, No, amount, vat){
                        const data = `qaimeSeria=${ser}&qaimeNumber=${No}`
                        fetch("https://qaime.e-taxes.gov.az/service/eqaime.getEqaimeAmounts", {
                            "headers": {
                                "accept": "text/plain, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": data,
                            "method": "POST",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(response=>response.json())
                            .then(async response=>{
                            if (response.response.code==='1114'){
                                hot.setDataAtCell(i, 6, response.response.message);
                                return;
                            }
                            const qaimeOid = response.qaimeOid
                            if (Number(response.umumiEdv) <= vat) {
                                amount = Math.min(response.umumiEdvsiz, amount)
                            }
                            const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                            fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                                "headers": {
                                    "accept": "text/plain, */*; q=0.01",
                                    "accept-language": "en-US,en;q=0.9",
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest"
                                },
                                "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                "referrerPolicy": "strict-origin-when-cross-origin",
                                "body": data,
                                "method": "POST",
                                "mode": "cors",
                                "credentials": "include"
                            }).then(response=>response.json())
                                .then(async response=>{
                                if (response.response.message.includes('Qeyd edilən e-qaimə faktura əvəzləşəcəklər siyahısında var.')){
                                    const data = `year=${year}&type=01&vhfSeria=${ser}&month=${month}&vhfNum=${No}`
                                    fetch("https://qaime.e-taxes.gov.az/service/eqaime.getRefundedList", {
                                        "headers": {
                                            "accept": "text/plain, */*; q=0.01",
                                            "accept-language": "en-US,en;q=0.9",
                                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                            "sec-ch-ua-mobile": "?0",
                                            "sec-fetch-dest": "empty",
                                            "sec-fetch-mode": "cors",
                                            "sec-fetch-site": "same-origin",
                                            "x-requested-with": "XMLHttpRequest"
                                        },
                                        "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                        "referrerPolicy": "strict-origin-when-cross-origin",
                                        "body": data,
                                        "method": "POST",
                                        "mode": "cors",
                                        "credentials": "include"
                                    }).then(response=>response.json())
                                        .then(async response=> {
                                        const detailOid = response.refundListDTO[0].detailOid
                                        if (Number(amount)>Number(response.refundListDTO[0].umumiEdvsiz)){
                                            hot.setDataAtCell(i, 6, `${response.refundListDTO[0].umumiEdvsiz}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.refundListDTO[0].umumiEdvsiz})`)
                                        } else if(Number(response.refundListDTO[0].odenilmisEdvsiz)!==Number(amount)){
                                            fetch("https://qaime.e-taxes.gov.az/service/eqaime.deleteRefundInfo", {
                                                "headers": {
                                                    "accept": "text/plain, */*; q=0.01",
                                                    "accept-language": "en-US,en;q=0.9",
                                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                    "sec-ch-ua-mobile": "?0",
                                                    "sec-fetch-dest": "empty",
                                                    "sec-fetch-mode": "cors",
                                                    "sec-fetch-site": "same-origin",
                                                    "x-requested-with": "XMLHttpRequest"
                                                },
                                                "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                                "referrerPolicy": "strict-origin-when-cross-origin",
                                                "body": `evezDetailOid%5B%5D=${detailOid}`,
                                                "method": "POST",
                                                "mode": "cors",
                                                "credentials": "include"
                                            }).then(async ()=>{
                                                const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                                                fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                                                    "headers": {
                                                        "accept": "text/plain, */*; q=0.01",
                                                        "accept-language": "en-US,en;q=0.9",
                                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                        "sec-ch-ua-mobile": "?0",
                                                        "sec-fetch-dest": "empty",
                                                        "sec-fetch-mode": "cors",
                                                        "sec-fetch-site": "same-origin",
                                                        "x-requested-with": "XMLHttpRequest"
                                                    },
                                                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                                    "body": data,
                                                    "method": "POST",
                                                    "mode": "cors",
                                                    "credentials": "include"
                                                }).then(response=>response.json())
                                                    .then(response=>{
                                                    if (response.response.code==='1114'){
                                                        hot.setDataAtCell(i, 6, response.response.message)
                                                    } else if(response.response.code==='0'){
                                                        hot.setDataAtCell(i, 6, 'Yazıldı')
                                                    }
                                                })
                                            })
                                        } else {
                                            hot.setDataAtCell(i, 6, 'Əvəzləşmə artıq yazılıb!')
                                        }
                                    })
                                }else if (response.response.code==='1114'){
                                    if(response.response.message.includes('ƏDV-yə cəlb edilən dəyəri')){
                                        hot.setDataAtCell(i, 6, `${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]})`)
                                    } else {
                                        hot.setDataAtCell(i, 6, response.response.message)}
                                } else if(response.response.code==='0'){
                                    hot.setDataAtCell(i, 6, 'Yazıldı')
                                }
                            })

                        })
                        if (!hot.countRows()%10){
                            //document.querySelector("#filterButton").click();
                        }

                    }

                    const data = `qaimeSeria=${ser}&qaimeNumber=${No}`
                    await sleep(timeout)
                    await fetch("https://qaime.e-taxes.gov.az/service/eqaime.getEqaimeAmounts", {
                        "headers": {
                            "accept": "text/plain, */*; q=0.01",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-requested-with": "XMLHttpRequest"
                        },
                        "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": data,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(response=>response.json())
                        .then(async response=>{
                        if (response.response.code==='1114'){
                            hot.setDataAtCell(i, 6, response.response.message);
                            return;
                        }
                        const qaimeOid = response.qaimeOid
                        if (Number(response.umumiEdv) <= vat) {
                            amount = Math.min(response.umumiEdvsiz, amount)
                        }
                        const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                        await sleep(timeout)
                        await fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                            "headers": {
                                "accept": "text/plain, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": data,
                            "method": "POST",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(response=>response.json())
                            .then(async response=>{
                            if (response.response.message.includes('Qeyd edilən e-qaimə faktura əvəzləşəcəklər siyahısında var.')){
                                const data = `year=${year}&type=01&vhfSeria=${ser}&month=${month}&vhfNum=${No}`
                                await sleep(timeout)
                                await fetch("https://qaime.e-taxes.gov.az/service/eqaime.getRefundedList", {
                                    "headers": {
                                        "accept": "text/plain, */*; q=0.01",
                                        "accept-language": "en-US,en;q=0.9",
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin",
                                        "x-requested-with": "XMLHttpRequest"
                                    },
                                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": data,
                                    "method": "POST",
                                    "mode": "cors",
                                    "credentials": "include"
                                }).then(response=>response.json())
                                    .then(async response=>{
                                    const detailOid = response.refundListDTO[0].detailOid
                                    if (Number(amount)>Number(response.refundListDTO[0].umumiEdvsiz)){
                                        hot.setDataAtCell(i, 6, `${response.refundListDTO[0].umumiEdvsiz}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.refundListDTO[0].umumiEdvsiz})`)
                                    } else if(Number(response.refundListDTO[0].odenilmisEdvsiz)!==Number(amount)){
                                        await sleep(timeout)
                                        await fetch("https://qaime.e-taxes.gov.az/service/eqaime.deleteRefundInfo", {
                                            "headers": {
                                                "accept": "text/plain, */*; q=0.01",
                                                "accept-language": "en-US,en;q=0.9",
                                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                "sec-ch-ua-mobile": "?0",
                                                "sec-fetch-dest": "empty",
                                                "sec-fetch-mode": "cors",
                                                "sec-fetch-site": "same-origin",
                                                "x-requested-with": "XMLHttpRequest"
                                            },
                                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                            "referrerPolicy": "strict-origin-when-cross-origin",
                                            "body": `evezDetailOid%5B%5D=${detailOid}`,
                                            "method": "POST",
                                            "mode": "cors",
                                            "credentials": "include"
                                        }).then(async ()=>{
                                            const data = `qaimeOid=${qaimeOid}&vhfSeria=${ser}&vhfNum=${No}&odenilmishEdv=${vat}&odenilmishEdvsiz=${amount}&setirKodu=${rowNo}&year=${year}&type=01&month=${month}`
                                            await sleep(timeout)
                                            await fetch("https://qaime.e-taxes.gov.az/service/eqaime.saveRefundInfo", {
                                                "headers": {
                                                    "accept": "text/plain, */*; q=0.01",
                                                    "accept-language": "en-US,en;q=0.9",
                                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                                    "sec-ch-ua-mobile": "?0",
                                                    "sec-fetch-dest": "empty",
                                                    "sec-fetch-mode": "cors",
                                                    "sec-fetch-site": "same-origin",
                                                    "x-requested-with": "XMLHttpRequest"
                                                },
                                                "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                                                "referrerPolicy": "strict-origin-when-cross-origin",
                                                "body": data,
                                                "method": "POST",
                                                "mode": "cors",
                                                "credentials": "include"
                                            }).then(response=>response.json())
                                                .then(response=>{
                                                if (response.response.code==='1114'){
                                                    hot.setDataAtCell(i, 6, response.response.message)
                                                } else if(response.response.code==='0'){
                                                    hot.setDataAtCell(i, 6, 'Yazıldı')
                                                }
                                            })
                                        })
                                    } else {
                                        hot.setDataAtCell(i, 6, 'Əvəzləşmə artıq yazılıb!')
                                    }
                                })
                            }else if (response.response.code==='1114'){
                                if(response.response.message.includes('ƏDV-yə cəlb edilən dəyəri')){
                                    hot.setDataAtCell(i, 6, `${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]}. Sətir kodu 308 və 314 seçildikdə Ödənilmiş ümumi dəyər qaimədə ƏDV-yə cəlb edilən dəyərdən çox ola bilməz ${ser} ${No} (ödənilmiş dəyər ${amount}, ƏDV-yə cəlb edilən dəyəri ${response.response.message.match(/ƏDV-yə cəlb edilən dəyəri (.*)\)/)[1]})`)
                                } else {
                                    hot.setDataAtCell(i, 6, response.response.message)}
                            } else if(response.response.code==='0'){
                                hot.setDataAtCell(i, 6, 'Yazıldı')
                            }
                        })

                    })
                    if (!hot.countRows()%10){
                        //document.querySelector("#filterButton").click();
                    }
                };
                //document.querySelector("#filterButton").click()
            }

            async function toggle(e){
                if (!e.target?.isChecked){
                    const rows = document.querySelector("#tableStriped2 > tbody").childNodes
                    for (let i = 0; i<rows.length;i++){
                        const row = rows[i]
                        row.childNodes[1].childNodes[0].childNodes[0].className = 'checked'
                        row.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked = true
                    }
                    e.target.isChecked = true
                } else {
                    const rows = document.querySelector("#tableStriped2 > tbody").childNodes
                    for (let i = 0; i<rows.length;i++){
                        const row = rows[i]
                        row.childNodes[1].childNodes[0].childNodes[0].className = ''
                        row.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked = false
                    }
                    e.target.isChecked = false
                }
            }

        } else if (window.location.href.includes('https://www.e-taxes.gov.az/vedop2/ebyn/dispatch')){
            function stringToDate(title,toString=false) {
                const [_, day, month, year, hour, minute, second] = title.match(
                    /(\d{2})\.(\d{2})\.(\d{4})[\s-]*(\d{2}):(\d{2}):(\d{2})/
                );
                if (!toString){
                    return new Date(year, month - 1, day, hour, minute, second).getTime();
                } else {
                    return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString("ru");
                }
            }
            let tableStyle = `position: relative; top: 150px; width: 50%; border: 1px double #AD422E;`
            let trStyle = `border: 1px double #AD422E;`
            if (document.querySelector("#waitingOperationOidZd")) {
                let table = document.createElement('table')
                table.style = tableStyle
                table.id = 'sum-tbl'
                let thead = document.createElement('thead')
                let tbody = document.createElement('tbody')
                table.appendChild(thead)
                table.appendChild(tbody)
                document.querySelector("#tblPrint > table > tbody > tr:nth-child(6) > td").appendChild(table)

                let headers = ['Seçim', 'Say', 'Məlumat' , 'Sub uçot qalığının məbləği', 'Məbləğ', 'Fərq']

                let thd = thead.insertRow();
                thd.style = trStyle;
                headers.forEach(header=>{
                    let thr = thd.insertCell();
                    thr.style = trStyle
                    thr.textContent = header;
                })
                let tbl = document.querySelector("#tblPrint > table > tbody > tr:nth-child(6) > td > table")
                let tblbody = tbl.tBodies[0]
                for ( let j = 1; j < tblbody.rows.length; j++){
                    tblbody.querySelector(`tr:nth-child(${j+1}) > td:nth-child(1) > input`).addEventListener('change', sum)
                }

                function sum () {
                    let countAll = 0
                    let countChecked = 0
                    let sumAll = 0
                    let sumChecked = 0
                    for ( let j = 1; j < tblbody.rows.length; j++){
                        if (tblbody.querySelector(`tr:nth-child(${j+1}) > td:nth-child(1) > input`).checked) {
                            sumChecked += Round(Number(tblbody.querySelector(`tr:nth-child(${j+1}) > td:nth-child(7)`).textContent))
                            countChecked += 1
                        }
                        sumAll += Round(Number(tblbody.querySelector(`tr:nth-child(${j+1}) > td:nth-child(7)`).textContent))
                        countAll += 1
                    }
                    tbody.querySelector(`tr:nth-child(1) > td:nth-child(2)`).textContent = Round(countAll)
                    tbody.querySelector(`tr:nth-child(2) > td:nth-child(2)`).textContent = Round(countChecked)
                    tbody.querySelector(`tr:nth-child(3) > td:nth-child(2)`).textContent = Round(countAll - countChecked)
                    tbody.querySelector(`tr:nth-child(1) > td:nth-child(5)`).textContent = Round(sumAll)
                    tbody.querySelector(`tr:nth-child(2) > td:nth-child(5)`).textContent = Round(sumChecked)
                    tbody.querySelector(`tr:nth-child(1) > td:nth-child(6)`).textContent = Round(Number(tbody.querySelector(`tr:nth-child(1) > td:nth-child(4)`).textContent)-Number(sumAll))
                    tbody.querySelector(`tr:nth-child(2) > td:nth-child(6)`).textContent = Round(Number(tbody.querySelector(`tr:nth-child(2) > td:nth-child(4)`).textContent)-Number(sumChecked))
                    tbody.querySelector(`tr:nth-child(3) > td:nth-child(4)`).textContent = Round(Number(tbody.querySelector(`tr:nth-child(1) > td:nth-child(4)`).textContent)-Number(tbody.querySelector(`tr:nth-child(2) > td:nth-child(4)`).textContent))
                    tbody.querySelector(`tr:nth-child(3) > td:nth-child(5)`).textContent = Round(Number(sumAll)-Number(sumChecked))
                    tbody.querySelector(`tr:nth-child(3) > td:nth-child(6)`).textContent = Round(Number(tbody.querySelector(`tr:nth-child(1) > td:nth-child(6)`).textContent)-Number(tbody.querySelector(`tr:nth-child(2) > td:nth-child(6)`).textContent))
                }
                const token = document.querySelector("#MTOKEN").value
                const doc = new DOMParser().parseFromString(await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "cache-control": "max-age=0",
                        "content-type": "application/x-www-form-urlencoded",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "same-origin",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1"
                    },
                    "body": `cmd=EDVINSERTJSPSRV&TOKEN=${token}`,
                    'method':'POST',
                }).then(response=>response.text().catch(0)),'text/html')
                const totalAmount = Number(doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText)
                for (let l = 0; l <= 2; l++){
                    let row = tbody.insertRow()
                    row.style = trStyle
                    for (let i = 0; i < headers.length; i++){
                        let cell = row.insertCell()
                        cell.Style = trStyle
                        if (l === 1 && i === 0) {
                            let checkbox = document.createElement('input')
                            checkbox.type = 'checkbox'
                            cell.appendChild(checkbox)
                            cell.style.textAlign = 'center'
                            checkbox.addEventListener('change', (e) => {
                                let tbody = tbl.tBodies[0]
                                for ( let j = 1; j < tbody.rows.length; j++){
                                    tbody.querySelector(`tr:nth-child(${j+1}) > td:nth-child(1) > input`).checked = e.target.checked
                                }
                                sum()
                            })
                        }
                        if ( i == 7 || i == 8) {
                            cell.style.textAlign = 'center'}
                        if ([0, 1].includes(l)){
                            if ( i === 3 ){
                                cell.textContent = totalAmount
                            }
                        }
                        if ([0, 1, 2].includes(l) && [3,4,5].includes(i)){
                            cell.style.textAlign = 'right'
                        }
                    }}
                sum()
            }

            if (document.querySelector('#edhOperationAmount')){
                const uploadButton = document.createElement('button');
                uploadButton.type = 'button'
                uploadButton.id = 'upload'
                uploadButton.className = ''
                uploadButton.style.marginLeft = '200px'
                uploadButton.style.marginTop = '20px'
                uploadButton.textContent = 'İmzalanacaq sənədlər qovluğuna göndər'
                const div = document.createElement('div')
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.flexDirection = 'column';






                ////////////////////////////////////////////////

                let table = document.createElement('table')
                table.id = 'data'
                document.body.appendChild(table)
                let thead = document.createElement('thead')
                let tbody = document.createElement('tbody')
                table.appendChild(thead)
                table.appendChild(tbody)
                let headers = [{value: '№', id: 'no', width: '50px'}, {value: 'VÖEN', id: 'taxId', width: '100px'}, {value: 'Məbləğ', id: 'amount', width: '75px'},{value: 'Təyinat', id: 'description', width: '550px'},{value: 'Nəticə', id: 'result', width: '150px'}]
                let thr = document.createElement('tr')
                thead.appendChild(thr)
                let style = `border: 1px solid black;`
                headers.forEach((header, index)=>{
                    let th = document.createElement('th')
                    th.textContent = header.value
                    th.id = header.id
                    thr.appendChild(th)
                    th.style = style;
                    th.style.width = header.width
                })

                table.style.borderCollapse = 'collapse'
                table.style.backgroundColor = 'white'

                function createRow (){
                    let tr = document.createElement('tr')
                    for (let j = 0; j < headers.length; j++){
                        let td = document.createElement('td')
                        td.style = style
                        td.id = headers[j].id
                        j !== 4 && (td.contentEditable = true)
                        tr.appendChild(td)
                    }
                    return tr
                }

                for (let i = 0; i < 10; i++){
                    let tr = createRow()
                    tbody.appendChild(tr)
                }

                table.addEventListener('input', onChange)

                function onChange (e){
                    let txt = e.target.innerText
                    let rowIndex = e.target.parentNode.rowIndex
                    let cellIndex = e.target.cellIndex
                    // console.log(e)
                    // console.log(rowIndex)
                    // console.log(cellIndex)
                    e.preventDefault();
                    // e.target.textContent = ''
                    let rows = txt.split(/\n/)
                    let lastIndex = rowIndex + rows.length
                    while (lastIndex > tbody.children.length + 1 ){
                        let tr = createRow()
                        tbody.appendChild(tr)
                    }
                    for (let r = 0; r < rows.length; r++){
                        let row = rows[r]
                        let cols = row.split(/\t/)
                        for (let c = 0; c < cols.length; c++){
                            let col = cols[c]
                            tbody.querySelector(`tr:nth-child(${r + rowIndex}) > td:nth-child(${c + 1 + cellIndex})`).textContent = col
                        }
                    }
                }

                document.body.appendChild(div);
                div.appendChild(table);
                div.appendChild(uploadButton);
                /////////////////////////////////////////////////




                uploadButton.addEventListener('click', handler)

                async function handler (){
                    const token = document.querySelector("#MTOKEN").value

                    const doc = new DOMParser().parseFromString(await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "max-age=0",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "same-origin",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1"
                        },
                        "body": `cmd=EDVINSERTJSPSRV&TOKEN=${token}`,
                        'method':'POST',
                    }).then(response=>response.text()),'text/html')
                    for (let i = 0; i < tbody.children.length; i++){
                        let row = tbody.children[i]
                        const taxId = row.querySelector('#taxId').textContent.replace(/\s/g,'')
                        if (!taxId) {
                            continue}
                        const amount = row.querySelector('#amount').textContent.replace(/\,/g,'.').replace(/\s/g,'')
                        const description = row.querySelector('#description').textContent

                        const myTaxId = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(1)").innerText
                        const taxName = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(2)").innerText
                        const totalAmount = doc.querySelector("#edv > table > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(3)").innerText

                        if (Number(amount) > Number(totalAmount)){
                            row.querySelector('#result').textContent = 'Ödənilən məbləğ, sub uçot hesabının qalığından çox ola bilməz !!!'
                            continue
                        }

                        await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                            "headers": {
                                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                                "cache-control": "max-age=0",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "document",
                                "sec-fetch-mode": "navigate",
                                "sec-fetch-site": "same-origin",
                                "sec-fetch-user": "?1",
                                "upgrade-insecure-requests": "1"
                            },
                            "method":"POST",
                            "referrer": "https://www.e-taxes.gov.az/vedop2/ebyn/dispatch",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": `TOKEN=${token}&cmd=EDV_SAVE_AS_WAITING_OPERATION_SRV&grupSayi=0&signedFilePath=&ok=0&edhOperationDebVoenOid=${myTaxId}&bildirishNo=&edhOperationDebVoenName=${taxName}&waitingOperationOid=null&waitingOperationOidS=&totalAmount=${totalAmount}&specialAccount=0&specialAccount=0&specialAmount=0&waitingOperationOid_1=&operationType=1&edhOperationCrdVoenOid=${taxId}&edhOperationAmount=${amount}&hdnInvCount=0&OperationTeyinat=${encodeURI(description)}&daxilol=1&yxoCode=&treasureCode=0900111111`,
                        }
                                   );
                        row.querySelector('#result').textContent = 'Yazıldı.'
                    }

                }}

            if (document.querySelector('[name="beyannameList"]')) {

                let children = document.querySelector(
                    '#type-b > table:nth-child(3) > tbody > tr:nth-child(4) > td > form > center > table > tbody'
                ).children;
                if (children.length > 0) {
                    function sorting(i = 0) {
                        let nodes = [...children].slice(3, children.length);
                        if (stringToDate(nodes[i].title) < stringToDate(nodes[i + 1].title)) {
                            nodes[i + 1].after(nodes[i]);
                            sorting(i > 0 ? i - 1 : i);
                        } else if (i < nodes.length - 2) {
                            sorting(i + 1);
                        }
                    }
                    sorting();
                }
            }


            if (document.querySelector("[name='packageSearch']")) {
                async function append(count=1000){
                    try{
                        const script = document.createElement('script')
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.js'
                        script.defer = true
                        document.head.appendChild(script);
                        {
                            const script = document.createElement('script')
                            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
                            script.defer = true
                            document.head.appendChild(script)
                        }
                        const btn = document.createElement('input');
                        btn.type = 'button';
                        btn.value = 'Download All';
                        btn.style.fontSize = '16px';
                        document.querySelector('#bodyDiv').appendChild(btn);
                        btn.addEventListener('click',()=>downloadAll({dl:true}));
                        document.querySelector("[name='beyannameTanim']").value = 'VAT'
                        document.querySelector("[name='durum'][value='4']").checked = true
                        document.querySelector("[name='donemBasYil']").value = document.querySelector("[name='donemBasYil']").options[document.querySelector("[name='donemBasYil']").options.length-1].value
                        document.querySelector("[name='donemBitAy']").value = new Date().getMonth()+1
                        document.querySelector("[name='donemBitYil']").value = document.querySelector("[name='donemBitYil']").options[document.querySelector("[name='donemBitYil']").options.length-1].value
                        document.querySelector('[name="sorguTipiB"]').checked = true;
                        document.querySelector('[name="sorguTipiP"]').checked = true;
                        document.querySelector('[name="sorguTipiD"]').checked = true;
                        const label = document.createElement('label')
                        label.id = 'Checker'
                        label.style.fontSize = '14px'
                        const labelText = document.createTextNode('text')
                        labelText.textContent = 'Bir paketdə yüklə.'
                        const checkbox = document.createElement('input')
                        checkbox.type = 'checkbox';
                        checkbox.id = 'onePaket'
                        checkbox.checked = true
                        label.appendChild(checkbox)
                        label.appendChild(labelText)
                        document.querySelector("#bodyDiv").appendChild(label)
                        {
                            const btn = document.createElement('input');
                            btn.type = 'button';
                            btn.value = 'Export';
                            btn.style.fontSize = '16px';
                            document.querySelector('#bodyDiv').appendChild(btn);
                            btn.addEventListener('click',()=>downloadAll({exp:true}));
                        }
                    } catch(error) {
                        if (count>0){
                            await new Promise((res,rej)=>{setTimeout(()=>{res()},100)})
                            append(count-1)
                        }
                    }};
                append();
                async function downloadAll({dl=false, exp=false}) {
                    const token = document.querySelector('#MTOKEN').value;
                    const yearFrom = Number(
                        document.querySelector("[name='donemBasYil']").value
                    );
                    const monthFrom = Number(
                        document.querySelector("[name='donemBasAy']").value
                    );
                    const yearTo = Number(
                        document.querySelector("[name='donemBitYil']").value
                    );
                    const monthTo = Number(
                        document.querySelector("[name='donemBitAy']").value
                    );
                    const vergiNo = document.querySelector('[name="vergiNo"]').value;
                    const decType = document.querySelector("[name='beyannameTanim']").value
                    const onePaket = document.querySelector("#onePaket").checked;
                    const declType = document.querySelector("input[type=radio][name='declType']:checked").value;
                    const Paket = new JSZip();
                    const vergiAd = await fetch("https://www.e-taxes.gov.az/vedop2/ebyn/dispatch", {
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "max-age=0",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "same-origin",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrer": "https://www.e-taxes.gov.az/vedop2/ebyn/dispatch",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `cmd=SICILVDGORUNTULE&TOKEN=${token}`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then((response) => response.text())
                    .then(html=>new DOMParser().parseFromString(html,'text/html')).then(doc=>doc.querySelector("col.table_header").parentElement.parentElement.querySelector("tbody > tr:nth-child(3) > td:nth-child(2)").textContent)
                    const data = `TOKEN=${token}&cmd=BEYANNAMELISTESI&grupSayi=0&${document.querySelector('[name="sorguTipiN"]').checked ? 'sorguTipiN=1&':''}vergiNo=${vergiNo}&${document.querySelector('[name="sorguTipiB"]').checked ? 'sorguTipiB=1&':''}beyannameTanim=${decType}&${document.querySelector('[name="sorguTipiP"]').checked ? 'sorguTipiP=1&':''}donemBasAy=${monthFrom}&donemBasYil=${yearFrom}&donemBitAy=${monthTo}&donemBitYil=${yearTo}&${document.querySelector('[name="sorguTipiV"]').checked ? 'sorguTipiV=1&':''}vdKodu=10&${document.querySelector('[name="sorguTipiZ"]').checked ? 'sorguTipiZ=1&':''}baslangicTarihi=${new Date().toLocaleDateString('ru')}&bitisTarihi=${new Date().toLocaleDateString('ru')}&${document.querySelector('[name="sorguTipiD"]').checked ? 'sorguTipiD=1&':''}durum=4&${document.querySelector('[name="sorguTipiS"]').checked ? 'sorguTipiS=1&':''}sentType=12${document.querySelector("input[type=checkbox][name='sorguTipiDt']").checked ? '&sorguTipiDt=1&declType='+encodeURI(declType):''}`
                    let xmlName;
                    const decs = await fetch('https://www.e-taxes.gov.az/vedop2/ebyn/dispatch', {
                        headers: {
                            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'accept-language': 'en-US,en;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                        },
                        referrer: 'https://www.e-taxes.gov.az/vedop2/ebyn/dispatch',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        body: data,
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                    }).then((response) => response.text())
                    .then(doc=>{return new DOMParser().parseFromString(doc,'text/html')})
                    .then(doc=>{
                        const Nodes = [...doc.querySelector("form[name='beyannameList'] > center > table > tbody").children]
                        const decNodes = Nodes.splice(3, Nodes.length-1)
                        return decNodes})
                    .then(nodes=>{
                        return nodes.sort((a, b) => {
                            return (stringToDate(b.title) - stringToDate(a.title));
                        })})
                    .then(sortedNodes=>{
                        const decs = []
                        for (let i = 0; i < sortedNodes.length; i++){
                            const decNode = sortedNodes[i]
                            if ((!decs.length || !decs.filter(x=>(x.children?.[7].textContent===decNode.children?.[7].textContent) && (x.children?.[4].textContent===decNode.children?.[4].textContent)).length)) {
                                decs.push(decNode)
                            }
                        }
                        return decs
                    })
                    let table,thead,tbody,th1,th2,th
                    for (let i = 0; i < decs.length; i++){
                        let dec = decs[i];
                        let url = ''
                        const [USERID, PACKAGE_OID, PACKAGE_NAME] = dec.querySelector('a')
                        .href.replace('javascript:downloadFile(', '')
                        .replace(');', '')
                        .replace(/'/g, '')
                        .split(',')
                        const parts = dec.title.split(' ')
                        const xmlName = parts[2]
                        const date = parts[5]
                        const time = parts[7]
                        let pckg = await localforage.getItem(PACKAGE_OID+'|'+PACKAGE_NAME)
                        let blob;
                        if (pckg && pckg.size >= 1024 ){
                            blob = pckg //new Blob([pckg], {type: 'text/plain'});
                        } else {
                            url = `https://www.e-taxes.gov.az/vedop2/ebyn/dispatch?cmd=EDV_EBYN_DOWNLOAD_PACKAGE&USERID=${String(USERID)}&S_USERID=${String(USERID)}&PACKAGE_OID=${PACKAGE_OID}&PACKAGE_NAME=${PACKAGE_NAME}&TOKEN=${token}`
                            let resp = await fetch(
                                url, {
                                    headers: {
                                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                        'accept-language': 'en-US,en;q=0.9',
                                        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                                        'sec-ch-ua-mobile': '?0',
                                        'sec-fetch-dest': 'iframe',
                                        'sec-fetch-mode': 'navigate',
                                        'sec-fetch-site': 'same-origin',
                                        'upgrade-insecure-requests': '1',
                                    },
                                    referrer: 'https://www.e-taxes.gov.az/vedop2/ebyn/dispatch',
                                    referrerPolicy: 'strict-origin-when-cross-origin',
                                    body: null,
                                    method: 'GET',
                                    mode: 'cors',
                                    credentials: 'include',
                                }
                            ).catch();
                            blob = await resp.blob()
                            localforage.setItem(PACKAGE_OID+'|'+PACKAGE_NAME, blob)
                        }
                        let xml;
                        if (dec.querySelector('td:nth-child(11)').textContent==='Kameral' || dec.querySelector('td:nth-child(11)').textContent==='Analoji'){
                            const zip = new JSZip()
                            const text = await new Response(blob).text()
                            xml = new DOMParser().parseFromString(text,'text/xml')
                            const decYear = xml.querySelector('yil')?.textContent
                            const decMonth = xml.querySelector('ay')?.textContent
                            const type = [...document.querySelector('[name="beyannameTanim"]').options].filter(x=>x.value===xml.querySelector('beyanname').getAttribute('kodVer').replace(/_1/g,''))[0].textContent
                            const decType = dec.querySelector('td:nth-child(11)').textContent;
                            if (dl){
                                if (!onePaket){
                                    const zip = new JSZip()
                                    zip.file(xmlName + '.xml' , blob)
                                    const output = await zip.generateAsync({type:"blob"})
                                    download(`${vergiNo} - ${decYear}${decMonth ? ('.' + String('0' + decMonth).slice(-2)):''} - ${decType} - ${date} ${time}.zip`, output)
                                    sleep(100)
                                } else {
                                    Paket.file(type + '/' + decYear +'/' + decYear + (decMonth ? ('.'+String('0' + decMonth).slice(-2)):'') + ' - ' + date + ' ' + time + ' - ' + xmlName + '.xml' , blob)
                                }}
                        } else {
                            const zip = new JSZip()
                            try {
                                const decls = await zip.loadAsync(blob)
                                const files = await decls.files
                                for (let file of Object.values(files)){
                                    const data = await file.async('text')
                                    if (data.includes('Beyanname-Manifest-Version: 1.0')){
                                        continue;
                                    }
                                    if (file.name!==xmlName){
                                        decls.remove(file.name)
                                        continue
                                    }
                                    xml = new DOMParser().parseFromString(data,'text/xml')
                                    const decYear = xml.querySelector('yil')?.textContent
                                    const decMonth = xml.querySelector('ay')?.textContent
                                    const type = [...document.querySelector('[name="beyannameTanim"]').options].filter(x=>x.value===xml.querySelector('beyanname').getAttribute('kodVer').replace(/_1/g,''))[0].textContent
                                    const decType = dec.querySelector('td:nth-child(11)').textContent;
                                    if (dl){
                                        if (!onePaket){
                                            const output = await zip.generateAsync({type:"blob"})
                                            download(`${vergiNo} - ${decYear}${decMonth ? ('.' + String('0' + decMonth).slice(-2)):''} - ${decType} - ${date} ${time}.zip`,output)
                                            sleep(100)
                                        } else {
                                            const decBlob = new Blob([data],{type: 'text/plain'})
                                            Paket.file(type + '/' + decYear +'/' + decYear + (decMonth ? ('.'+String('0' + decMonth).slice(-2)):'') + ' - ' + date + ' ' + time + ' - ' + xmlName , decBlob)
                                        }
                                    }
                                }
                            }catch(error){}
                        }

                        if (exp) {
                            let XMLDoc = xml;
                            if (XMLDoc.querySelector('beyanname').attributes['kodVer'].value!=='VAT_1'){
                                continue
                            }
                            function getElement(nodeValue, parent = 'beyanname', returnNode = "deyer", nodeName = "gosterici") {
                                if (Number(XMLDoc.querySelector("yil")) < 2020 && returnNode === "deyer") {
                                    returnNode = "meblag";
                                }
                                try {
                                    return [...XMLDoc.querySelector(parent).querySelectorAll(nodeName)]
                                        .filter((x) => x.textContent == String(nodeValue))[0]
                                        .parentNode.querySelector(returnNode).textContent;
                                } catch (error) {
                                    return 0;
                                }
                            }
                            const props = {
                                deyer: "Təqdim edilmiş mal iş və xidmətlərin dəyəri (ƏDV nəzərə alınmadan)",
                                dedv: "Təqdim edilmiş mal iş və xidmətlərin Əlavə dəyər vergisi məbləği",
                                edvsiz: "Daxil olmuş məbləğ (ƏDV nəzərə alınmadan)",
                                edv: "Daxil olmuş məbləğ (Əlavə dəyər vergisi məbləği)",
                            };

                            let structure = {
                                kodlar: {
                                    aramaSecenekleri: {
                                        secenek: {
                                            aciklama: "YGB-nin №-si",
                                            kod: "2",
                                        },
                                    },
                                    umumiGruplar: {
                                        umumiGrup: [
                                            {
                                                kod: "1",
                                                ad: "Vergi Məcəlləsi çərçivəsində fəaliyyət göstərən vergi ödəyicisi",
                                            },
                                            {
                                                kod: "2",
                                                ad: "Qanunla çərçivəsində fəaliyyət göstərən xüsusi vergi recimli meəssisələr",
                                            },
                                        ],
                                    },
                                    faturaTurleri: {
                                        faturaTuru: {
                                            kod: "1",
                                            ad: "Gömrük bəyannaməsi",
                                        },
                                    },
                                    edvGostericiler: {
                                        edvGosterici: [
                                            {
                                                kod: "301",
                                                sign: "+",
                                                kod2: "1001",
                                                ad: "301. ƏDV-nə 18 faiz dərəcə ilə cəlb olunan əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1",
                                                sign: "+",
                                                kod2: "1101",
                                                ad: "301.1 Malların təqdim edilməsi, işlərin görülməsi, xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.2",
                                                sign: "+",
                                                kod2: "1103",
                                                ad: "301.2 Azərbaycan Respublikası ərazisində istehsal olunan kənd təsərrüfatı məhsullarının pərakəndə satışı üzrə ƏDV-nə cəlb olunan ticarət əlavəsi",
                                            },
                                            {
                                                kod: "302",
                                                sign: "+",
                                                kod2: "1002",
                                                ad: "302. ƏDV-nə sıfır (0) faiz dərəcə ilə cəlb olunan əməliyyatlar",
                                            },
                                            {
                                                kod: "303",
                                                sign: "+",
                                                kod2: "1003",
                                                ad: "303. ƏDV-dən azad olunan əməliyyatlar",
                                            },
                                            {
                                                kod: "304",
                                                sign: "+",
                                                kod2: "1004",
                                                ad: "304. ƏDV-nə 20 faiz dərəcə ilə tutulan əməliyyatlar",
                                            },
                                            {
                                                kod: "305",
                                                sign: "+",
                                                kod2: "1005",
                                                ad: "305. Əməliyyatlar üzrə CƏMİ",
                                            },
                                            {
                                                kod: "306",
                                                sign: "+",
                                                kod2: "1006",
                                                ad: "306. Vergi Məcəlləsinin 169-cu maddəsinə əsasən qeyri-rezidentin göstərdiyi xidmətlər və ya gördüyü işlər üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "306.1",
                                                sign: "+",
                                                kod2: "1108",
                                                ad: "306.1 ƏDV-nin məqsədləri üçün qeydiyyata alınmayan qeyri-rezidentin göstərdiyi xidmətlər və ya gördüyü işlər üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "306.2",
                                                sign: "+",
                                                kod2: "1109",
                                                ad: "306.2 Elektron ticarət qaydasında işlərin və xidmətlərin vergi ödəyicisi kimi uçotda olmayan alıcısının ödəmələri ",
                                            },
                                            {
                                                kod: "306.3",
                                                sign: "+",
                                                kod2: "1110",
                                                ad: "306.3 Azərbaycan Respublikasının hüdudlarından kənarda elektron qaydada təşkil olunan lotereyaların, digər yarışların və müsabiqələrin iştirakçısının ödənişi üzrə ",
                                            },
                                        ],
                                    },
                                    edvDebitorBorcGostericiler: {
                                        edvBorcGosterici: [
                                            {
                                                kod: "307",
                                                sign: "+",
                                                kod2: "1400",
                                                ad: "307 Debitor borclar üzrə",
                                            },
                                            {
                                                kod: "307.1",
                                                sign: "+",
                                                kod2: "1401",
                                                ad: "307.1 ƏDV-nə 18 faiz dərəcə ilə cəlb olunan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "307.2",
                                                sign: "+",
                                                kod2: "1402",
                                                ad: "307.2 ƏDV-nə sıfır (0) faiz dərəcə ilə cəlb olunan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "307.3",
                                                sign: "+",
                                                kod2: "1403",
                                                ad: "307.3 ƏDV-dən azad olunan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "307-1",
                                                sign: "+",
                                                kod2: "1404",
                                                ad: "307-1 01.01.2020-ci il tarixə olan debitor borclar üzrə",
                                            },
                                            {
                                                kod: "307-1.1",
                                                sign: "+",
                                                kod2: "1405",
                                                ad: "307-1.1 ƏDV-nə 18 faiz dərəcə ilə cəlb olunan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "307-1.2",
                                                sign: "+",
                                                kod2: "1406",
                                                ad: "307-1.2 ƏDV-nə sıfır (0) faiz dərəcə ilə cəlb olunan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "307-1.3",
                                                sign: "+",
                                                kod2: "1407",
                                                ad: "307-1.3 ƏDV-dən azad olunan əməliyyatlar üzrə",
                                            },
                                        ],
                                    },
                                    edvAvazGostericiler: {
                                        edvAvazGosterici: [
                                            {
                                                kod: "308",
                                                sign: "+",
                                                kod2: "1008",
                                                ad: "308. VM 175.1-ci maddəsinə əsasən alınmış elektron qaimə-fakturalar (elektron vergi hesab-fakturalar) üzrə nağdsız qaydada ödənilmiş məbləğ",
                                            },
                                            {
                                                kod: "308.1",
                                                sign: "+",
                                                kod2: "1420",
                                                ad: "308.1 Gəlirdən birbaşa çıxılmayan kapital xarakterli xərclər üzrə əvəzləşdirilmələr (ƏDV nəzərə alınmadan)",
                                            },
                                            {
                                                kod: "309",
                                                sign: "+",
                                                kod2: "1009",
                                                ad: "309. 01.01.2001-ci il tarixinə olan borcların nağdsız qaydada ödənilmiş məbləği",
                                            },
                                            {
                                                kod: "310",
                                                sign: "+",
                                                kod2: "1010",
                                                ad: "310. İdxalda ƏDV-yə cəlb olunmuş mallara(işlərə,xidmətlərə) görə ödənilmiş məbləğ",
                                            },
                                            {
                                                kod: "310.1",
                                                sign: "+",
                                                kod2: "1510",
                                                ad: "310.1 Gəlirdən birbaşa çıxılmayan kapital xarakterli xərclər üzrə əvəzləşdirilmələr (ƏDV nəzərə alınmadan)",
                                            },
                                            {
                                                kod: "311",
                                                sign: "+",
                                                kod2: "1011",
                                                ad: "311. İdxalda ƏDV-dən azad olunan mallara(işlərə,xidmətlərə) görə ödənilmiş məbləğ",
                                            },
                                            {
                                                kod: "312",
                                                sign: "+",
                                                kod2: "1012",
                                                ad: "312. Vergi Məcəlləsinin 169.4-cü maddəsinə əsasən qeyri-rezidentə ödənilmiş məbləğ",
                                            },
                                            {
                                                kod: "313",
                                                sign: "+",
                                                kod2: "1017",
                                                ad: "313. Vergi Məcəlləsi 175.2-cü maddəsinə əsasən əvəzləşdirilməsinə yol verilməyən ƏDV məbləği",
                                            },
                                            {
                                                kod: "314",
                                                sign: "+",
                                                kod2: "1013",
                                                ad: "314. Vergi Məcəlləsinin 175.3-cü maddəsinə əsasən əvəzləşdirilməsinə yol verilməyən ƏDV məbləği",
                                            },
                                            {
                                                kod: "315",
                                                sign: "-",
                                                kod2: "1014",
                                                ad: "315. Vergi Məcəlləsinin 175.4-cü maddəsinə əsasən əvəzləşdirilməsinə yol verilməyən ƏDV məbləği",
                                            },
                                            {
                                                kod: "316",
                                                sign: "+",
                                                kod2: "1015",
                                                ad: "316. ƏDV-yə sıfır(0) faiz dərəcəsi ilə ödənilmiş məbləğ",
                                            },
                                            {
                                                kod: "317",
                                                sign: "-",
                                                kod2: "1016",
                                                ad: "317. Əməliyyatlar üzrə CƏMİ",
                                            },
                                        ],
                                    },
                                    edvDegisGostericiler: {
                                        edvDegisGosterici: [
                                            {
                                                kod: "318",
                                                sign: "+",
                                                kod2: "1017",
                                                ad: "318. ƏDV-yə cəlb olunan ARTIRILAN dövriyyələr üzrə ƏDV-nin hesablanması ",
                                            },
                                            {
                                                kod: "319",
                                                sign: "-",
                                                kod2: "1018",
                                                ad: "319. ƏDV-yə cəlb olunan AZALDILAN dövriyyələr üzrə ƏDV-nin hesablanması ",
                                            },
                                            {
                                                kod: "319.1",
                                                sign: "-",
                                                kod2: "1035",
                                                ad: "319.1. ƏDV-yə cəlb olunan AZALDILAN dövriyyələr üzrə ƏDV-nin hesablanması",
                                            },
                                            {
                                                kod: "319.2",
                                                sign: "-",
                                                kod2: "1036",
                                                ad: "319.2. Vergi Məcəlləsinin 165.5-ci maddəsinə əsasən ƏDV-si qaytarılan malların geri qaytarılması halları üzrə ƏDV-nin hesablanması (NAĞD ödənişlər)",
                                            },
                                            {
                                                kod: "319.3",
                                                sign: "-",
                                                kod2: "1045",
                                                ad: "319.3. Vergi Məcəlləsinin 165.5-ci maddəsinə əsasən ƏDV-si qaytarılan malların geri qaytarılması halları üzrə ƏDV-nin hesablanması (NAĞDSIZ ödənişlər)",
                                            },
                                            {
                                                kod: "319.4",
                                                sign: "-",
                                                kod2: "1430",
                                                ad: "319.4. Vergi Məcəlləsinin 165.6-cı maddəsinə əsasən ƏDV-si qaytarılan malların geri qaytarılması halları üzrə ƏDV-nin hesablanması (NAĞDSIZ ödənişlər)",
                                            },
                                            {
                                                kod: "320",
                                                sign: "+",
                                                kod2: "1019",
                                                ad: "320. ƏDV-yə sıfır (0) faiz dərəcəsi ilə cəlb olunan əməliyyatlar üzrə ARTIRILAN dövriyyə",
                                            },
                                            {
                                                kod: "321",
                                                sign: "+",
                                                kod2: "1020",
                                                ad: "321. ƏDV-yə sıfır (0) faiz dərəcəsi ilə cəlb olunan əməliyyatlar üzrə AZALDILAN dövriyyə",
                                            },
                                            {
                                                kod: "322",
                                                sign: "+",
                                                kod2: "1021",
                                                ad: "322. ƏDV-dən azad olunan əməliyyatlar üzrə ARTIRILAN dövriyyə",
                                            },
                                            {
                                                kod: "323",
                                                sign: "+",
                                                kod2: "1022",
                                                ad: "323. ƏDV-dən azad olunan əməliyyatlar üzrə AZALDILAN dövriyyə",
                                            },
                                            {
                                                kod: "324",
                                                sign: "+",
                                                kod2: "1431",
                                                ad: "324. Əvəzləşdirilən əməliyyatların AZALDILMASINA görə ƏDV-nin bərpa edilən məbləği",
                                            },
                                            {
                                                kod: "325",
                                                sign: "+",
                                                kod2: "1432",
                                                ad: "325. Əvəzləşdirilən əməliyyatların ARTIRILMASINA görə ƏDV-nin bərpa edilən məbləği",
                                            },
                                        ],
                                    },
                                    edvHesaplasmalar: {
                                        edvHesaplasma: [
                                            {
                                                kod: "326",
                                                sign: "+",
                                                kod2: "1023",
                                                ad: "326. Büdcəyə ödənilməlidir",
                                            },
                                            {
                                                kod: "327",
                                                sign: "+",
                                                kod2: "1092",
                                                ad: "327. Büdcədən qaytarılır",
                                            },
                                        ],
                                    },
                                    ilave1Gostericiler: {
                                        ilave1Gosterici: [
                                            {
                                                kod: "5001",
                                                sign: "+",
                                                kod2: "1025",
                                                ad: "Cari hesabat dövründə əldə edilmiş Yük Gömrük Bəyannaməsi üzrə alınmış malın ƏDV-siz ümumi dəyəri və ƏDV məbləğlərinin CƏMİ",
                                            },
                                        ],
                                    },
                                    ilave1GostericilerEvvel: {
                                        ilave1GostericiEvvel: [
                                            {
                                                kod: "5003",
                                                sign: "+",
                                                kod2: "1029",
                                                ad: "Əvvəlki dövrlərdə əldə edilmiş Yük Gömrük Bəyannaməsi üzrə alınmış və ƏDV məbləği ödənilmiş  malın (işin, xidmətin) ƏDV-siz ümumi dəyər və ƏDV məbləğlərinin CƏMİ",
                                            },
                                            {
                                                kod: "5005",
                                                sign: "+",
                                                kod2: "1032",
                                                ad: "YÜK GÖMRÜK BƏYANNAMƏLƏRİ üzrə alınmış malın(işin,xidmətin) cari hesabat dövründə ödənilmiş ƏDV məbləğlərinin YEKUNU",
                                            },
                                        ],
                                    },
                                    ilave1Sebepler: {
                                        ilave1Sebep: [
                                            {
                                                kod: "1",
                                                ad: "Vergi hesab fakturası",
                                            },
                                            {
                                                kod: "2",
                                                ad: "Gömrük bəyannaməsi",
                                            },
                                        ],
                                    },
                                    ilave3Bolum2Gostericiler: {
                                        ilave3Bolum2Gosterici: [
                                            {
                                                kod: "301.1",
                                                sign: "+",
                                                kod2: "1091",
                                                ad: "301.1 Təqdim edilmiş mallar(işlər,xidmətlər) üzrə ƏDV-nə cəlb olunan dövriyyələrin məbləği CƏMİ",
                                            },
                                            {
                                                kod: "301.1.1",
                                                sign: "+",
                                                kod2: "1037",
                                                ad: "301.1.1 Malların təqdim edilməsindən gəlir",
                                            },
                                            {
                                                kod: "301.1.1.1",
                                                sign: "+",
                                                kod2: "1038",
                                                ad: "301.1.1.1 Girov əmlakların(malların) təqdim edilməsi",
                                            },
                                            {
                                                kod: "301.1.1.2",
                                                sign: "+",
                                                kod2: "1039",
                                                ad: "301.1.1.2 Əmək haqqının əvəzınə təqdim edilmiş mallar",
                                            },
                                            {
                                                kod: "301.1.1.3",
                                                sign: "+",
                                                kod2: "1040",
                                                ad: "301.1.1.3 Aqent vasitəsi ilə təqdim edilmiş mallar üzrə gəlirlər",
                                            },
                                            {
                                                kod: "301.1.1.4",
                                                sign: "+",
                                                kod2: "1041",
                                                ad: "301.1.1.4 Müstəqil ƏDV ödəyicisi olan struktur bölmələri arasında təqdim edilmiş mallar",
                                            },
                                            {
                                                kod: "301.1.1.5",
                                                sign: "+",
                                                kod2: "1042",
                                                ad: "301.1.1.5 Haqqı ödənilməklə və ya əvəzsiz qaydada öz işçilərinə və digər şəxslərə mal verilməsi",
                                            },
                                            {
                                                kod: "301.1.1.6",
                                                sign: "+",
                                                kod2: "1043",
                                                ad: "301.1.1.6 Barter əməliyyatları üzrə malların təqdim edilməsi",
                                            },
                                            {
                                                kod: "301.1.1.7",
                                                sign: "+",
                                                kod2: "1044",
                                                ad: "301.1.1.7 Digər malların təqdim edilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.1.8",
                                                sign: "+",
                                                kod2: "1046",
                                                ad: "301.1.1.8 Təqdim ediləcək malların hesabına əvvəlcədən alınmış ödənişləri",
                                            },
                                            {
                                                kod: "301.1.1.9",
                                                sign: "+",
                                                kod2: "9001",
                                                ad: "301.1.1.9  Daşınan və daşınmaz əmlakın təqdim edilməsindən gəlirlər",
                                            },
                                            {
                                                kod: "301.1.1.10",
                                                sign: "+",
                                                kod2: "1216",
                                                ad: "301.1.1.10 Mallar təqdim edildikdən sonra verilmiş borclar",
                                            },
                                            {
                                                kod: "301.1.1.11",
                                                sign: "+",
                                                kod2: "1217",
                                                ad: "301.1.1.11 Mallar təqdim edilənədək verilmiş borclar",
                                            },
                                            {
                                                kod: "301.1.1.12",
                                                sign: "+",
                                                kod2: "1218",
                                                ad: "301.1.1.12 Malların təqdim edilməsi üzrə yaranan debitor borclar üzrə iddia müddətinin bitməsi",
                                            },
                                            {
                                                kod: "301.1.1.13",
                                                sign: "+",
                                                kod2: "1219",
                                                ad: "301.1.1.13 Qarşılıqlı hesablaşmalar aparıldıqda öhdəliyin ləğv edilməsi və ya ödənilməsi",
                                            },
                                            {
                                                kod: "301.1.1.14",
                                                sign: "+",
                                                kod2: "1252",
                                                ad: "301.1.1.14 Tələb hüququ güzəşt edildikdə \u2013 güzəşt edilən məbləğ",
                                            },
                                            {
                                                kod: "301.1.2",
                                                sign: "+",
                                                kod2: "1055",
                                                ad: "301.1.2 İşlərin görülməsi və xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.2.1",
                                                sign: "+",
                                                kod2: "1056",
                                                ad: "301.1.2.1 Daşınan və daşınmaz əmlakın icarəyə verilməsindən gəlirlər",
                                            },
                                            {
                                                kod: "301.1.2.2",
                                                sign: "+",
                                                kod2: "1057",
                                                ad: "301.1.2.2 Əmək haqqının  əvəzinə işlərin görülməsi və  xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.2.3",
                                                sign: "+",
                                                kod2: "1058",
                                                ad: "301.1.2.3 Müstəqil ƏDV ödəyicisi olan struktur bölmələri arasında işlərin görülməsi və xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.2.4",
                                                sign: "+",
                                                kod2: "1059",
                                                ad: "301.1.2.4 Əvəzsiz işlərin görülməsi və xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.2.5",
                                                sign: "+",
                                                kod2: "1060",
                                                ad: "301.1.2.5 Barter əməliyyatları üzrə işlərin görülməsi və xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "301.1.2.6",
                                                sign: "+",
                                                kod2: "1061",
                                                ad: "301.1.2.6 Sair işlərin görülməsi və xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "301.1.2.7",
                                                sign: "+",
                                                kod2: "1063",
                                                ad: "301.1.2.7 Təqdim ediləcək işlərin və xidmətlərin hesabına əvvəlcədən alınmış ödənişləri",
                                            },
                                            {
                                                kod: "301.1.2.8",
                                                sign: "+",
                                                kod2: "1220",
                                                ad: "301.1.2.8 Emal əməliyyatları üzrə işlərin görülməsi və xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "301.1.2.9",
                                                sign: "+",
                                                kod2: "1221",
                                                ad: "301.1.2.9 İşlər, xidmətlər təqdim edildikdən sonra verilmiş borclar",
                                            },
                                            {
                                                kod: "301.1.2.10",
                                                sign: "+",
                                                kod2: "1222",
                                                ad: "301.1.2.10 İşlər, xidmətlər təqdim edilənədək verilmiş borclar",
                                            },
                                            {
                                                kod: "301.1.2.11",
                                                sign: "+",
                                                kod2: "1223",
                                                ad: "301.1.2.11 Tələb hüququ güzəşt edildikdə \u2013 güzəşt edilən məbləğ",
                                            },
                                            {
                                                kod: "301.1.2.12",
                                                sign: "+",
                                                kod2: "1224",
                                                ad: "301.1.2.12 İşlərin, xidmətlərin təqdim edilməsi üzrə yaranan debitor borclar üzrə iddia müddətinin bitməsi",
                                            },
                                            {
                                                kod: "301.1.2.13",
                                                sign: "+",
                                                kod2: "1225",
                                                ad: "301.1.2.13 Qarşılıqlı hesablaşmalar aparıldıqda öhdəliyin ləğv edilməsi və ya ödənilməsi",
                                            },
                                            {
                                                kod: "301.1.3",
                                                sign: "+",
                                                kod2: "1094",
                                                ad: "301.1.3 Vergi Məcəlləsinin 159.5-ci maddəsinə əsasən ƏDV tutulan əməliyyat sayılan mallardan (işlərdən, xidmətlərdən) qeyri-kommersiya məqsədləri üçün istifadə edilməsi, fövqəladə hallardan başqa malların itməsi, əksik gəlməsi, xarab olması, tam amortizasiya olunmadan uçotdan silinməsi və ya oğurlanması üzrə məbləğ",
                                            },
                                            {
                                                kod: "301.1.4",
                                                sign: "+",
                                                kod2: "1064",
                                                ad: "301.1.4 Vergi Məcəlləsinin 159.6-cü maddəsinə əsasən ƏDV üzrə qeydiyyatı ləğv edilmə tarixinə olan mal qalığının məbləği",
                                            },
                                            {
                                                kod: "301.1.5",
                                                sign: "+",
                                                kod2: "1095",
                                                ad: "301.1.5 VM-nin 159.10-cu maddəsinə əsasən bu Məcəllənin 164.1.11-ci, 164.1.15-ci, 164.1.16-cı və 164.1.20-164.1.25-ci, 164.1.33-cü və 164.1.35-ci maddələrinə və 164-cü maddənin digər bəndlərinə uyğun olaraq ƏDV-dən azad edilən idxal mallarının Azərbaycan Respublikasının ərazisində təqdim edilməsi ilə əlaqədar vergi tutulan əməliyyatlar üzrə məbləğ",
                                            },
                                            {
                                                kod: "301-1",
                                                sign: "+",
                                                kod2: "1226",
                                                ad: "301-1 Elektron ticarət üzrə ƏDV-yə 18 faiz dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                            {
                                                kod: "301-2",
                                                sign: "+",
                                                kod2: "1227",
                                                ad: "301-2 Pərakəndə ticarət üzrə ƏDV-yə 18 faiz dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                            {
                                                kod: "301-3",
                                                sign: "+",
                                                kod2: "1228",
                                                ad: "301-3 Topdan ticarət üzrə ƏDV-yə 18 faiz dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                        ],
                                    },
                                    ilave3Bolum3Gostericiler: {
                                        ilave3Bolum3Gosterici: [
                                            {
                                                kod: "326",
                                                sign: "+",
                                                kod2: "1065",
                                                ad: "326. VM-nin 159.2-ci maddəsinə əsasən bu Məcəllənin 167-ci və 168-ci maddələrinə uyğun olaraq  Azərbaycan Respublikasınını hüdudlarından kənarda malların təqdim edilməsi, xidmətlərin göstərilməsi və işlər görülməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "327",
                                                sign: "+",
                                                kod2: "1066",
                                                ad: "327. VM-nin 159.5-ci maddəsinə əsasən  fövqəladə hallarda malların itməsi, əskik gəlməsi, xarab olması, tam amortizasiya olunmadan uçotdan silinməsi və ya oğurlanması üzrə məbləğ",
                                            },
                                            {
                                                kod: "328",
                                                sign: "+",
                                                kod2: "1067",
                                                ad: "328. Vergi Məcəlləsinin 159.7-ci maddəsinə əsasən vergiyə cəlb olunmayan əməliyyatlar",
                                            },
                                            {
                                                kod: "329",
                                                sign: "+",
                                                kod2: "1068",
                                                ad: "329. Vergi Məcəlləsinin 160-ci maddəsinə əsasən müəssisənin təqdim edilməsi",
                                            },
                                            {
                                                kod: "330",
                                                sign: "+",
                                                kod2: "1120",
                                                ad: "330. Müstəqil sahibkarlıq fəaliyyəti çərçivəsində malların göndərilməsi, işlərin görülməsi və xidmətlərin göstərilməsi sayılmayan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "331",
                                                sign: "+",
                                                kod2: "1121",
                                                ad: "331. Rüsumsuz ticarət mağazalarında (Duty-Free) malların təqdim edilməsi və xidmətlərin göstərilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "332",
                                                sign: "+",
                                                kod2: "1230",
                                                ad: "332. Qeyri-sahibkarlıq fəaliyyəti üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "333",
                                                sign: "+",
                                                kod2: "1231",
                                                ad: "333. Pul vəsaitləri üzrə əməliyyatlar (maliyyə xidmətləri istisna olmaqla)",
                                            },
                                            {
                                                kod: "334",
                                                sign: "+",
                                                kod2: "1232",
                                                ad: "334. Qeyri-maddi aktivlər və torpaqların təqdim edilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "335",
                                                sign: "+",
                                                kod2: "1236",
                                                ad: "335. VM-nin 224.8-ci maddəsinə əsasən Bu Məcəllənin 222.5.5-ci maddəsində göstərilən fəaliyyətlə məşğul olan şəxslər tərəfindən alınmış ərzaq və hazırlanmış qida məhsullarının xarab olması üzrə məbləğ(1 yanvar 2021-ci il tarixədək)",
                                            },
                                        ],
                                    },
                                    ilave4Gostericiler: {
                                        ilave4Gosterici: [
                                            {
                                                kod: "302",
                                                sign: "+",
                                                kod2: "1069",
                                                ad: "302. ƏDV-yə sıfır(0) dərəcə ilə cəlb edilən əməliyyatların məbləği CƏMİ",
                                            },
                                            {
                                                kod: "302.1",
                                                sign: "+",
                                                kod2: "1070",
                                                ad: "302.1 VM-nin 165.1.1-ci maddəsinə əsasən Azərbaycan Respublikasında akkreditə edilmiş beynəlxalq təşkilatların və xarici ölkələrin diplomatik və konsulluq nümayəndəliklərinin rəsmi istifadəsi, həmçinin, bu nümayəndəliklərin müvafiq statuslu Azərbaycan Respublikasının vətəndaşı olmayan diplomatik və inzibati-texniki işçilərinin, o cümlədən onlarla yaşayan ailə üzvlərinin şəxsi istifadəsi üçün nəzərdə tutulan mallar və xidmətlər",
                                            },
                                            {
                                                kod: "302.2",
                                                sign: "+",
                                                kod2: "1071",
                                                ad: "302.2 VM-nin 165.1.2-ci maddəsinə əsasən qrant müqaviləsi (qərarı) əsasında xaricdən alınan qrantlar hesabına malların idxalı, qrant üzrə resipiyentlərə malların təqdim edilməsi, işlərin görülməsi və xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "302.3",
                                                sign: "+",
                                                kod2: "1072",
                                                ad: "302.3 VM-nin 165.1.3-cü maddəsinə əsasən aparılan əməliyyatlar",
                                            },
                                            {
                                                kod: "302.3.1",
                                                sign: "+",
                                                kod2: "2001",
                                                ad: "302.3.1. VM-nin 165.1.3-cü maddəsinə əsasən malların ixracı üzrə aparılmış əməliyyatlar",
                                            },
                                            {
                                                kod: "302.3.2",
                                                sign: "+",
                                                kod2: "2002",
                                                ad: "302.3.2. VM-nin 165.1.3-cü maddəsinə əsasən bu Məcəllənin 168.1.5-ci maddəsində göstərilmiş xidmətlərin ixracı üzrə aparılmış əməliyyatlar",
                                            },
                                            {
                                                kod: "302.4",
                                                sign: "+",
                                                kod2: "1073",
                                                ad: "302.4 VM-nin 165.1.4-cü maddəsinə əsasən beynəlxalq poçt xidmətləri istisna olmaqla, beynəlxalq və tranzit yük və sərnişin daşınması, habelə tranzit yük daşınması ilə bilavasitə bağlı yük aşırılma xidməti. Beynəlxalq və tranzit uçuşlarla bilavasitə bağlı olan işlərin görülməsi, xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "302.5",
                                                sign: "+",
                                                kod2: "1074",
                                                ad: "302.5 VM-nin 165.1.5-ci maddəsinə əsasən Azərbaycan Respublikasının Mərkəzi Bankına qızıl və digər qiymətlilərin göndərilməsi",
                                            },
                                            {
                                                kod: "302.6",
                                                sign: "+",
                                                kod2: "2003",
                                                ad: "302.6 VM-nin 165.1.7-ci maddəsinə əsasən sənaye parkının rezidentinə podratçı tərəfindən, podratçıya isə onunla birbaşa müqavilə bağlamış subpodratçı tərəfindən həmin fəaliyyətin məqsədləri üçün malların təqdim edilməsi, işlərin görülməsi və xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "302.7",
                                                sign: "+",
                                                kod2: "1076",
                                                ad: "302.7 Qanunla təsdiq olunmuş hasilatın pay bölgüsü haqqında, əsas boru kəməri haqqında və digər bu qəbildən olan sazişlərdə və ya qanunlarda, o cümlədən neft və qaz haqqında, ixrac məqsədli neft-qaz fəaliyyəti haqqında qanunlar çərçivəsində aparılan əməliyyatlar",
                                            },
                                            {
                                                kod: "302.7.1",
                                                sign: "+",
                                                kod2: "1122",
                                                ad: "302.7.1 o cümlədən əvvəlcədən alınmış ödənişlər",
                                            },
                                            {
                                                kod: "302.8",
                                                sign: "+",
                                                kod2: "1077",
                                                ad: "302.8 Təqdim ediləcək malların (işlərin, xidmətlərin) hesabına əvvəlcədən alınmış ödənişlər üzrə",
                                            },
                                            {
                                                kod: "302.9",
                                                sign: "+",
                                                kod2: "1237",
                                                ad: "302.9 Vergi Məcəlləsinin 165.1.8-ci maddəsinə əsasən aparılan əməliyyatlar",
                                            },
                                            {
                                                kod: "302.10",
                                                sign: "+",
                                                kod2: "1238",
                                                ad: "302.10 Vergi Məcəlləsinin 165.1.9-cu maddəsinə əsasən aparılan əməliyyatlar",
                                            },
                                            {
                                                kod: "302.11",
                                                sign: "+",
                                                kod2: "1123",
                                                ad: "302.11 Xüsusi iqtisadi zonalar haqqında qanunlar çərçivəsində aparılan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "302.12",
                                                sign: "+",
                                                kod2: "1124",
                                                ad: "302.12 Azərbaycan Respublikasının tərəfdar çıxdığı beynəlxalq müqavilələr üzrə",
                                            },
                                            {
                                                kod: "302-1",
                                                sign: "+",
                                                kod2: "1233",
                                                ad: "302-1 Elektron ticarət üzrə ƏDV-yə sıfır (0) dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                            {
                                                kod: "302-2",
                                                sign: "+",
                                                kod2: "1234",
                                                ad: "302-2 Pərakəndə ticarət üzrə ƏDV-yə sıfır (0) dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                            {
                                                kod: "302-3",
                                                sign: "+",
                                                kod2: "1235",
                                                ad: "302-3 Topdan ticarət üzrə ƏDV-yə sıfır (0) dərəcə ilə cəlb edilən əməliyyatlar",
                                            },
                                        ],
                                    },
                                    ilave5Gostericiler: {
                                        ilave5Gosterici: [
                                            {
                                                kod: "303",
                                                sign: "+",
                                                kod2: "1078",
                                                ad: "303. ƏDV-dən azad olunan əməliyyatların məbləği CƏMİ",
                                            },
                                            {
                                                kod: "303.1",
                                                sign: "+",
                                                kod2: "1079",
                                                ad: "303.1 VM-nin 164.1.1-ci maddəsinə əsasən özəlləşdirilmə qaydasında dövlət müəssisəsindən satın alınan əmlakın dəyəri, habelə dövlət əmlakının icarəyə verilməsindən alınan icarə haqqının büdcəyə ödənilməli olan hissəsi",
                                            },
                                            {
                                                kod: "303.2",
                                                sign: "+",
                                                kod2: "1080",
                                                ad: "303.2 VM-nin 164.1.2-ci maddəsinə əsasən maliyyə xidmətlərinin göstərilməsi",
                                            },
                                            {
                                                kod: "303.3",
                                                sign: "+",
                                                kod2: "1081",
                                                ad: "303.3 VM-nin 164.1.3-cü maddəsinə əsasən milli və ya xarici valyutanın (numizmatika məqsədlərindən başqa), həmçinin qiymətli kağızların göndərilməsi",
                                            },
                                            {
                                                kod: "303.4",
                                                sign: "+",
                                                kod2: "1083",
                                                ad: "303.4 VM-nin 164.1.5-ci maddəsinə əsasən idxal olunan əmlak istisna olmaqla müəssisənin Nizamnamə fonduna (kapitalına) pay şəklində hər hansı əmlakın qoyulması (əmlakın pay şəklində qoyuluşu, onun müqabilində bilavasitə digər əmlakın əldə edilməsi ilə əlaqədar olmadıqda)",
                                            },
                                            {
                                                kod: "303.5",
                                                sign: "+",
                                                kod2: "1084",
                                                ad: "303.5 VM-nin 164.1.6-cı maddəsinə əsasən tutulan məbləğlər hədlərində dövlət hakimiyyəti, maliyyə bazarlarına nəzarət, yerli özünüidarəetmə və digər səlahiyyətli orqanların tutduğu dövlət rüsumu, icazə haqları, yığımlar, xüsusi notariusların aldığı haqlar (notariat hərəkətlərinin aparılmasına və notariat hərəkətləri ilə əlaqədar göstərilən xidmətə görə) və onların tutulması müqabilində göstərdiyi xidmətlər",
                                            },
                                            {
                                                kod: "303.6",
                                                sign: "+",
                                                kod2: "1085",
                                                ad: "303.6 VM-nin 164.1.7-ci maddəsinə əsasən kütləvi informasiya vasitələri məhsullarının alqı-satqısının bütün növləri üzrə dövriyyələr, mətbu kütləvi informasiya vasitələri məhsulları istehsalı ilə bağlı redaksiya, nəşriyyat və poliqrafiya fəaliyyəti (reklam xidmətləri istisna olmaqla)",
                                            },
                                            {
                                                kod: "303.7",
                                                sign: "+",
                                                kod2: "1086",
                                                ad: "303.7 VM-nin 164.1.8-ci maddəsinə əsasən ümumtəhsil müəssisələri, habelə peşə təhsili müəssisələri üçün dərslik komplektləri (iş dəftərləri istisna olmaqla) və uşaq ədəbiyyatının istehsalı ilə bağlı redaksiya, nəşriyyat və poliqrafiya fəaliyyəti",
                                            },
                                            {
                                                kod: "303.8",
                                                sign: "+",
                                                kod2: "1087",
                                                ad: "303.8 VM-nin 164.1.9-cu maddəsinə əsasən dəfn və qəbiristanlığın mərasim xidmətləri",
                                            },
                                            {
                                                kod: "303.9",
                                                sign: "+",
                                                kod2: "1088",
                                                ad: "303.9 VM-nin 164.1.10-cu maddəsinə əsasən Azərbaycan Respublikası Mərkəzi Bankının və Azərbaycan Respublikası Dövlət Neft Fondunun qanunvericiliklə nəzərdə tutulmuş vəzifələrinin yerinə yetirilməsi ilə bağlı mal idxalı, iş görülməsi və xidmət göstərilməsi",
                                            },
                                            {
                                                kod: "303.10",
                                                sign: "+",
                                                kod2: "1089",
                                                ad: "303.10 VM-nin 164.1.11-ci maddəsinə əsasən Azərbaycan Respublikasına, o cümlədən onu təmsil edən hüquqi şəxslərə neft-qaz ehtiyatlarının kəşfiyyatı, işlənməsi və hasilatın pay bölgüsü, ixrac boru kəmərləri haqqında və bu qəbildən olan digər sazişlərə uyğun olaraq verilməsi nəzərdə tutulan əsas fondların, daşınan əmlakın və digər aktivlərin Azərbaycan Respublikası Dövlət Neft Fonduna və ya Azərbaycan Respublikasını təmsil edən tərəfə hər hansı şəkildə təqdim edilməsi",
                                            },
                                            {
                                                kod: "303.11",
                                                sign: "+",
                                                kod2: "1091",
                                                ad: "303.11 VM-nin 164.1.12-ci maddəsinə əsasən metropolitenlə sərnişindaşıma xidmətləri",
                                            },
                                            {
                                                kod: "303.12",
                                                sign: "+",
                                                kod2: "1093",
                                                ad: "303.12 VM-nin 164.1.13-cü maddəsinə əsasən ödənişli təhsil xidmətlərinin göstərilməsi (digər fəaliyyətləri ilə bağlı xidmətlərin göstərilməsi istisna olmaqla)",
                                            },
                                            {
                                                kod: "303.13",
                                                sign: "+",
                                                kod2: "3014",
                                                ad: "303.13 VM-nin 164.1.14-cü maddəsinə əsasən Vergi Məcəllənin 106.1.9-106.1.11-ci maddələri ilə müəyyən olunan aktivlərin dəyəri və onların hər hansı şəkildə təqdim olunması üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "303.14",
                                                sign: "+",
                                                kod2: "3017",
                                                ad: "303.14 VM-nin 164.1.17-ci maddəsinə əsasən hüquqi şəxsin iştirak paylarının və ya səhmlərinin təqdim edilməsi",
                                            },
                                            {
                                                kod: "303.15",
                                                sign: "+",
                                                kod2: "9092",
                                                ad: "303.15 VM-nin 164.1.18-ci maddəsinə əsasən kənd təsərrüfatı məhsullarının istehsalçıları (o cümlədən, sənaye üsulu ilə) tərəfindən özlərinin istehsal etdikləri kənd təsərrüfatı məhsullarının satışı üzrə dövriyyələr  ",
                                            },
                                            {
                                                kod: "303.16",
                                                sign: "+",
                                                kod2: "1112",
                                                ad: "303.16 VM-nin 164.1.27-ci maddəsinə əsasən buğdanın idxalı və satışı, buğda ununun və çörəyin istehsalı və satışı  ",
                                            },
                                            {
                                                kod: "303.17",
                                                sign: "+",
                                                kod2: "1113",
                                                ad: "303.17 VM-nin 164.1.29-cu maddəsinə əsasən damazlıq heyvanların idxalı və satış  ",
                                            },
                                            {
                                                kod: "303.18",
                                                sign: "+",
                                                kod2: "1114",
                                                ad: "303.18 VM-nin 164.1.30-cu maddəsinə əsasən toxum və tinglərin idxalı və satışı  ",
                                            },
                                            {
                                                kod: "303.19",
                                                sign: "+",
                                                kod2: "1115",
                                                ad: "303.19 VM-nin 164.1.31-ci maddəsinə əsasən mineral gübrələrin, pestisidlərin idxalı və satışı  ",
                                            },
                                            {
                                                kod: "303.20",
                                                sign: "+",
                                                kod2: "1116",
                                                ad: "303.20 VM-nin 164.1.32-ci maddəsinə əsasən toxumların yetişdirilməsi, quşçuluq və arıçılıq üçün avadanlıqların, o cümlədən laboratoriya avadanlıqlarının, toxum, taxıl və quru paxlalı bitkilərin təmizlənməsi, çeşidlənməsi və ya kalibrlənməsi üçün maşınların idxalı və satışı  ",
                                            },
                                            {
                                                kod: "303.21",
                                                sign: "+",
                                                kod2: "1117",
                                                ad: "303.21 VM-nin 164.1.34-cü maddəsinə əsasən bilavasitə kənd təsərrüfatı təyinatlı suvarma və digər qurğuların, maşınların, avadanlıqların və texnikaların idxalı və satışı  ",
                                            },
                                            {
                                                kod: "303.22",
                                                sign: "+",
                                                kod2: "1118",
                                                ad: "303.22 VM-nin 164.1.36-cı maddəsinə əsasən ödəmə qabiliyyətini itirmiş bankların restrukturizasiya və sağlamlaşdırma tədbirləri çərçivəsində müvafiq icra hakimiyyəti orqanının müəyyən etdiyi qaydada qeyri-işlək (toksik) aktivlərin təqdim edilməsi  ",
                                            },
                                            {
                                                kod: "303.23",
                                                sign: "+",
                                                kod2: "1119",
                                                ad: "303.23 VM-nin 164.1.37-ci maddəsinə əsasən heyvan və quş ətinin satışı",
                                            },
                                            {
                                                kod: "303.24",
                                                sign: "+",
                                                kod2: "1214",
                                                ad: "303.24 VM-nin 164.1.42-ci maddəsinə əsasən \u201CMəşğulluq haqqında\u201D Azərbaycan Respublikasının Qanununa uyğun olaraq müvafiq icra hakimiyyəti orqanının müəyyən etdiyi orqan (qurum) tərəfindən haqqı ödənilən ictimai işlərin təşkili ilə əlaqədar işçi qüvvəsinin təqdim edilməsi üzrə əməliyyatlar",
                                            },
                                            {
                                                kod: "303.25",
                                                sign: "+",
                                                kod2: "1240",
                                                ad: "303.25 VM-nin 164.1.43-cü maddəsinə əsasən kəpəyin istehsalı və satışı",
                                            },
                                            {
                                                kod: "303.26",
                                                sign: "+",
                                                kod2: "1241",
                                                ad: "303.26 VM-nin 164.1.44-cü maddəsinə əsasən Azərbaycan Futbol Federasiyaları Assosiasiyası tərəfindən verilmiş təsdiqedici sənəd əsasında Azərbaycan Respublikasında keçirilən UEFA 2019 Avropa Liqasının final oyunu ilə əlaqədar UEFA, onun yaratdığı qeyri-rezident hüquqi şəxslər və qeyri-rezident futbol klubları (assosiasiyaları) tərəfindən həmin oyunla bağlı malların təqdim edilməsi, işlər görülməsi və xidmətlər göstərilməsi",
                                            },
                                            {
                                                kod: "303.27",
                                                sign: "+",
                                                kod2: "1242",
                                                ad: "303.27 VM-nin 164.1.45-ci maddəsinə əsasən Azərbaycan Futbol Federasiyaları Assosiasiyası tərəfindən verilmiş təsdiqedici sənəd əsasında Azərbaycan Respublikasında keçirilən UEFA 2020 Futbol çempionatı ilə əlaqədar UEFA, onu təmsil edən, habelə onun yaratdığı və tərəfindən səlahiyyətləndirilmiş hüquqi şəxslər tərəfindən çempionatla bağlı malların təqdim edilməsi, işlər görülməsi və xidmətlər göstərilməsi",
                                            },
                                            {
                                                kod: "303.28",
                                                sign: "+",
                                                kod2: "1243",
                                                ad: "303.28 VM-nin 164.1.46-cı maddəsinə əsasən heyvandarlıq və quşçuluq təsərrüfatlarında istifadə edilən yem və yem əlavələrinin satışı üzrə dövriyyələr",
                                            },
                                            {
                                                kod: "303.29",
                                                sign: "+",
                                                kod2: "1244",
                                                ad: "303.29 VM-nin 164.1.47-ci maddəsinə əsasən bina tikintisi fəaliyyəti ilə məşğul olan şəxslər tərəfindən tikilən binanın yaşayış sahəsinin dövlətə ayrılan hissəsi üzrə dövriyyələr",
                                            },
                                            {
                                                kod: "303.30",
                                                sign: "+",
                                                kod2: "1245",
                                                ad: "303.30 VM-nin 164.1.48-ci maddəsinə əsasən siyahısı müvafiq icra hakimiyyəti orqanının müəyyən etdiyi orqan (qurum) (Prezident) tərəfindən təsdiq edilən dövlət adından yaradılan publik hüquqi şəxslər tərəfindən nizamnaməsində nəzərdə tutulan və ona həvalə edilən vəzifələrin yerinə yetirilməsi üçün büdcə qanunvericiliyinə uyğun olaraq dövlət büdcəsindən ayrılmış vəsait hesabına Maliyyə Nazirliyi ilə bağlanılmış müqavilə əsasında işlərin və xidmətlərin göstərilməsi",
                                            },
                                            {
                                                kod: "303.31",
                                                sign: "+",
                                                kod2: "1246",
                                                ad: "303.31 VM-nin 164.1.49-cu maddəsinə əsasən Azərbaycan Respublikasında keçirilən Formula 1 və Formula 2 yarışları ilə bağlı Gənclər və İdman Nazirliyi ilə bağlanılmış müqavilə əsasında mal, iş və xidmətin təqdim edilməsi",
                                            },
                                            {
                                                kod: "303.32",
                                                sign: "+",
                                                kod2: "1247",
                                                ad: "303.32 VM-nin 164.1.50-ci maddəsinə əsasən Azərbaycan Respublikasında daimi nümayəndəlik yaratmayan qeyri-rezident şəxslərin mülki aviasiya fəaliyyəti çərçivəsində hava gəmilərinin və hava gəmilərinin mühərriklərinin rezident hüquqi şəxslərə icarəyə və ya lizinqə verilməsi",
                                            },
                                            {
                                                kod: "303.33",
                                                sign: "+",
                                                kod2: "1248",
                                                ad: "303.33 VM-nin 164.1.51-ci maddəsinə əsasən \u201CTibbi sığorta haqqında\u201D Azərbaycan Respublikasının Qanununa uyğun olaraq icbari tibbi sığorta fondunun vəsaiti hesabına tibbi sığorta xidmətlərinin göstərilməsi",
                                            },
                                            {
                                                kod: "303.34",
                                                sign: "+",
                                                kod2: "1253",
                                                ad: "303.34 VM-nin 164.1.55-ci maddəsinə əsasən külçə, sikkə və ya qranul şəklində qızılın və gümüşün satışı",
                                            },
                                            {
                                                kod: "303.35",
                                                sign: "+",
                                                kod2: "1090",
                                                ad: "303.35 Təqdim ediləcək malların (işlərin, xidmətlərin) hesabına əvvəlcədən alınmış ödənişləri",
                                            },
                                            {
                                                kod: "303.36",
                                                sign: "+",
                                                kod2: "1125",
                                                ad: "303.36 Azərbaycan Respublikasının tərəfdar çıxdığı beynəlxalq müqavilələr üzrə",
                                            },
                                            {
                                                kod: "303.37",
                                                sign: "+",
                                                kod2: "1126",
                                                ad: "303.37 Xüsusi iqtisadi zonalar haqqında qanunlar çərçivəsində aparılan əməliyyatlar üzrə",
                                            },
                                            {
                                                kod: "303-1",
                                                sign: "+",
                                                kod2: "1249",
                                                ad: "303-1 Elektron ticarət üzrə ƏDV-dən azad olunan əməliyyatlar",
                                            },
                                            {
                                                kod: "303-2",
                                                sign: "+",
                                                kod2: "1250",
                                                ad: "303-2 Pərakəndə ticarət üzrə ƏDV-dən azad olunan əməliyyatlar",
                                            },
                                            {
                                                kod: "303-3",
                                                sign: "+",
                                                kod2: "1251",
                                                ad: "303-3 Topdan ticarət üzrə ƏDV-dən azad olunan əməliyyatlar",
                                            },
                                        ],
                                    },
                                    ilave1SatirKoduReferanslari: {
                                        ilave1SatirKoduReferansi: [
                                            {
                                                kod2: "102",
                                                aciklama: "310",
                                                oran: "0.18",
                                                faturaTipi: "1",
                                            },
                                            {
                                                kod2: "103",
                                                aciklama: "311",
                                                oran: "0.00",
                                                faturaTipi: "1",
                                            },
                                            {
                                                kod2: "104",
                                                aciklama: "314",
                                                oran: "0.18",
                                                faturaTipi: "1",
                                            },
                                            {
                                                kod2: "105",
                                                aciklama: "316",
                                                oran: "0.00",
                                                faturaTipi: "1",
                                            },
                                        ],
                                    },
                                    vatBDSatirKoduReferanslari: {
                                        vatBDSatirKoduReferansi: [
                                            {
                                                kod2: "101",
                                                aciklama: "%18",
                                                oran: "0.18",
                                                faturaTipi: "0",
                                            },
                                            {
                                                kod2: "105",
                                                aciklama: "%0",
                                                oran: "0.00",
                                                faturaTipi: "0",
                                            },
                                        ],
                                    },
                                    sertfikatSerileri: {
                                        sertfikatSeri: [
                                            {
                                                kod2: "101",
                                                aciklama: "AB",
                                            },
                                            {
                                                kod2: "102",
                                                aciklama: "AI",
                                            },
                                            {
                                                kod2: "103",
                                                aciklama: "Az",
                                            },
                                            {
                                                kod2: "104",
                                                aciklama: "Bin",
                                            },
                                            {
                                                kod2: "105",
                                                aciklama: "BTC",
                                            },
                                            {
                                                kod2: "106",
                                                aciklama: "BTƏ",
                                            },
                                            {
                                                kod2: "107",
                                                aciklama: "C-Q",
                                            },
                                            {
                                                kod2: "108",
                                                aciklama: "D",
                                            },
                                            {
                                                kod2: "109",
                                                aciklama: "İn",
                                            },
                                            {
                                                kod2: "110",
                                                aciklama: "K-Q",
                                            },
                                            {
                                                kod2: "111",
                                                aciklama: "MK",
                                            },
                                            {
                                                kod2: "112",
                                                aciklama: "Nx",
                                            },
                                            {
                                                kod2: "113",
                                                aciklama: "Pd",
                                            },
                                            {
                                                kod2: "114",
                                                aciklama: "Pr",
                                            },
                                            {
                                                kod2: "115",
                                                aciklama: "Qr",
                                            },
                                            {
                                                kod2: "116",
                                                aciklama: "Şd",
                                            },
                                            {
                                                kod2: "117",
                                                aciklama: "Sur",
                                            },
                                            {
                                                kod2: "118",
                                                aciklama: {},
                                            },
                                            {
                                                kod2: "119",
                                                aciklama: "ZHb",
                                            },
                                            {
                                                kod2: "120",
                                                aciklama: "ZM",
                                            },
                                        ],
                                    },
                                    gostericilerMuzdlu: {
                                        gosterici: [
                                            {
                                                kod2: "1330",
                                                sign: "+",
                                                ad: "330. Cari hesabat ayında və ya hesabat dövrünün 1-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1331",
                                                sign: "-",
                                                ad: "330.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                            {
                                                kod2: "1332",
                                                sign: "+",
                                                ad: "331. Hesabat dövrünün 2-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1333",
                                                sign: "-",
                                                ad: "331.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                            {
                                                kod2: "1334",
                                                sign: "+",
                                                ad: "332. Hesabat dövrünün 3-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1335",
                                                sign: "-",
                                                ad: "332.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                        ],
                                    },
                                    gostericilerMuzdlu2: {
                                        gosterici: [
                                            {
                                                kod2: "1336",
                                                sign: "+",
                                                ad: "330. Cari hesabat ayında və ya hesabat dövrünün 1-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1337",
                                                sign: "-",
                                                ad: "330.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                            {
                                                kod2: "1338",
                                                sign: "+",
                                                ad: "331. Hesabat dövrünün 2-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1339",
                                                sign: "-",
                                                ad: "331.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                            {
                                                kod2: "1340",
                                                sign: "+",
                                                ad: "332. Hesabat dövrünün 3-Cİ AYI -nda muzdlu işlə əlaqədar hesablamalar",
                                            },
                                            {
                                                kod2: "1341",
                                                sign: "-",
                                                ad: "332.1 o cümlədən xarici fiziki şəxslər üzrə",
                                            },
                                        ],
                                    },
                                },
                            };

                            let targets = [
                                {
                                    name: "edvGosterici",
                                    data: structure["kodlar"]["edvGostericiler"]["edvGosterici"],
                                    prop: props,
                                },
                                {
                                    name: "edvBorcGosterici",
                                    data: structure["kodlar"]["edvDebitorBorcGostericiler"]["edvBorcGosterici"],
                                    prop: {
                                        borcEvvel: "Hesabat dövrünün əvvəlinə debitor borc məbləği",
                                        borcYaranan: "Hesabat dövrü (ay) üzrə yaranan debitor borc məbləği",
                                        borcSilinen: "Hesabat dövrü (ay) ərzində silinən debitor borc məbləği",
                                        borcSon: "Hesabat dövrünün sonuna debitor borc məbləği",
                                    },
                                },
                                {
                                    name: "edvAvazGosterici",
                                    data: structure["kodlar"]["edvAvazGostericiler"]["edvAvazGosterici"],
                                    parent:'HesaplamaUzreEnt',
                                    prop: {
                                        edvsiz: "Ödənilmiş məbləğ (ƏDV nəzərə alınmadan)",
                                        edv: "Əlavə dəyər vergisi məbləği",
                                    },
                                    parent: 'HesaplamaAvazEnt'
                                },
                                {
                                    name: "edvDegisGosterici",
                                    data: structure["kodlar"]["edvDegisGostericiler"]["edvDegisGosterici"],
                                    prop: props,
                                    parent:'HesaplamaDegisEnt'
                                },
                                {
                                    name: "edvHesaplasma",
                                    data: structure["kodlar"]["edvHesaplasmalar"]["edvHesaplasma"],
                                    prop: {meblag:'ƏDV Məbləği'},
                                    parent:'ozel',
                                },
                                {},
                                {
                                    name: "ilave1Gosterici",
                                    data: structure["kodlar"]["ilave1Gostericiler"]["ilave1Gosterici"],
                                    prop: {
                                        edvsiz: "Malın ƏDV-siz ümumi dəyəri",
                                        edvMeblag: "Malın ƏDV məbləği",
                                    },
                                },
                                {
                                    name: "ilave1GostericiEvvel",
                                    data: structure["kodlar"]["ilave1GostericilerEvvel"][
                                        "ilave1GostericiEvvel"
                                    ],
                                    prop: {
                                        edvsiz: "Malın ƏDV-siz ümumi dəyəri",
                                        edvMeblag: "Malın ƏDV məbləği",
                                    },
                                },
                                {},
                                {
                                    name: "ilave3Bolum2Gosterici",
                                    data: structure["kodlar"]["ilave3Bolum2Gostericiler"][
                                        "ilave3Bolum2Gosterici"
                                    ],
                                    parent:'EdvAmeliyyatEnt',
                                    prop: {
                                        deyer:
                                        "Təqdim edilmiş mal, iş və xidmətlərin dəyəri (ƏDV nəzərə alınmadan)",
                                        meblag: "Daxil olmuş məbləğ (ƏDV nəzərə alınmadan)",
                                    },
                                },
                                {
                                    name: "ilave3Bolum3Gosterici",
                                    data: structure["kodlar"]["ilave3Bolum3Gostericiler"][
                                        "ilave3Bolum3Gosterici"
                                    ],
                                    parent:'EdvAmeliyyatEnt',
                                    prop: {
                                        deyer:
                                        "Təqdim edilmiş mal, iş və xidmətlərin dəyəri (ƏDV nəzərə alınmadan)",
                                        meblag: "Daxil olmuş məbləğ (ƏDV nəzərə alınmadan)",
                                    },
                                },
                                {},
                                {
                                    name: "ilave4Gosterici",
                                    data: structure["kodlar"]["ilave4Gostericiler"]["ilave4Gosterici"],
                                    parent:'SifirEdvEnt',
                                    prop: {
                                        deyer: "Təqdim edilmiş mal, iş və xidmətlərin dəyəri",
                                        meblag: "Daxil olmuş məbləğ",
                                    },
                                },
                                {},
                                {
                                    name: "ilave5Gosterici",
                                    data: structure["kodlar"]["ilave5Gostericiler"]["ilave5Gosterici"],
                                    parent: 'AzadEdvEnt',
                                    prop: {
                                        deyer: "Təqdim edilmiş mal, iş və xidmətlərin dəyəri",
                                        meblag: "Daxil olmuş məbləğ",
                                    },
                                },
                                {},
                                {
                                    name: "gostericilerMuzdlu",
                                    data: structure["kodlar"]["gostericilerMuzdlu"]["gosterici"],
                                    prop: props,
                                },
                                {
                                    name: "gostericilerMuzdlu2",
                                    data: structure["kodlar"]["gostericilerMuzdlu2"]["gosterici"],
                                    prop: props,
                                },
                            ];
                            if ( i === 0 ){
                                table = document.createElement("table");
                                thead = document.createElement("thead");
                                tbody = document.createElement("tbody");
                                th1 = document.createElement("tr");
                                th1.className = "th1";
                                th = document.createElement("th");
                                th.textContent = "DÖVR";
                                th.colSpan = 2;
                                th1.appendChild(th);
                                th2 = document.createElement("tr");
                                th2.className = "th2";
                                th2.appendChild(
                                    document
                                    .createElement("th")
                                    .appendChild(document.createTextNode("İl")).parentNode
                                );
                                th2.appendChild(
                                    document
                                    .createElement("th")
                                    .appendChild(document.createTextNode("Ay")).parentNode
                                );
                                thead.appendChild(th1);
                                thead.appendChild(th2);
                                for (let j = 0; j < targets.length; j++) {
                                    let target = targets[j];
                                    let { name, data, prop } = target;
                                    if (Object.keys(target).length) {
                                        for (let h = 0; h < data.length; h++) {
                                            let node = data[h];
                                            let th = document.createElement("th");
                                            th.textContent = node?.["ad"];
                                            th.colSpan = Object.keys(prop).length;
                                            th1.appendChild(th);
                                            for (let m = 0; m < Object.keys(prop).length; m++) {
                                                let key = Object.keys(prop)[m];
                                                let th = document.createElement("th");
                                                th.textContent = prop[Object.keys(prop)[m]];
                                                th2.appendChild(th);
                                            }
                                        }
                                    } else {
                                        let th = document.createElement("th");
                                        th1.appendChild(th);
                                        th = document.createElement("th");
                                        th2.appendChild(th);
                                        let tr = document.createElement("tr");
                                        let td = document.createElement("td");
                                        tr.appendChild(td);
                                    }
                                }

                            }
                            let tr = document.createElement("tr");
                            tr.appendChild(
                                document
                                .createElement("td")
                                .appendChild(
                                    document.createTextNode(XMLDoc.querySelector("yil").textContent)
                                ).parentNode
                            );
                            tr.appendChild(
                                document
                                .createElement("td")
                                .appendChild(
                                    document.createTextNode(
                                        ("0" + XMLDoc.querySelector("ay").textContent).substring(
                                            XMLDoc.querySelector("ay").textContent.length - 1,
                                            3
                                        )
                                    )
                                ).parentNode
                            );

                            for (let j = 0; j < targets.length; j++) {
                                let target = targets[j];
                                let { name, parent, data, prop } = target;
                                if (Object.keys(target).length) {
                                    for (let h = 0; h < data.length; h++) {
                                        let node = data[h];
                                        for (let l = 0; l < Object.keys(prop).length; l++) {
                                            let key = Object.keys(prop)[l];
                                            let td = document.createElement("td");
                                            if (key === "dedv") {
                                                td.textContent = String(
                                                    Math.round(Number(getElement(node.kod2), parent, "deyer") * 0.18 * 100) /
                                                    100
                                                ).replace(".", ",");
                                            } else {
                                                td.textContent = String(getElement(node.kod2, parent, key)).replace(
                                                    ".",
                                                    ","
                                                );
                                            }
                                            tr.appendChild(td);
                                        }
                                    }
                                } else {
                                    let td = document.createElement("td");
                                    tr.appendChild(td);
                                }
                            }
                            tbody.appendChild(tr);
                            if (i === decs.length-1){
                                let tr = document.createElement("tr");
                                tr.appendChild(document.createElement("td"));
                                tr.appendChild(document.createElement("td"));
                                table.appendChild(thead);
                                table.appendChild(tbody);

                                for (let c = 2; c <= tbody.firstChild.lastChild.cellIndex; c++) {
                                    let sum = 0;
                                    for (let r = 0; r < tbody.children.length; r++) {
                                        sum +=
                                            Math.round(
                                            Number(tbody.children[r].children[c].textContent.replace(",", ".")) *
                                            100
                                        ) / 100;
                                    }
                                    let td = document.createElement("td");
                                    td.textContent = String(Math.round(sum * 100) / 100).replace('.',',');
                                    tr.appendChild(td);
                                }
                                tbody.appendChild(tr);
                                table.style.borderCollapse = "collapse";
                                th2.querySelector("th").style.width = "50px";
                                let children = tbody.children;
                                if (children.length > 0) {
                                    function sorting(i = 0) {
                                        let nodes = [...children].slice(0, children.length-1);
                                        if (nodes[i]?.children.length === 1) {
                                            return;
                                        } else if (Number(nodes[i].children[0].textContent+nodes[i].children[1].textContent) >= Number(nodes[i+1]?.children[0]?.textContent+nodes[i+1]?.children[1]?.textContent)) {
                                            nodes[i + 1].after(nodes[i]);
                                            sorting(i > 0 ? i - 1 : i);
                                        } else if (i < nodes.length-2) {
                                            sorting(i + 1);
                                        }
                                    }
                                    sorting();
                                }

                                let newTab = window.open('')
                                newTab.document.body.appendChild(table);
                                newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black;width: 100px ;min-width: 50px;}; </style>')
                            }

                        }

                    }
                    if (onePaket && dl){
                        const blob = await Paket.generateAsync({type:"blob"})
                        download(vergiNo + ' - ' + vergiAd + '.zip',blob)
                    }

                }

            }

        }
    }

    async function refundList(){

        let fromYear = Number(document.querySelector("#year").value)
        let toYear = Number(document.querySelector("#year-2").value)
        let fromMonth = Number(document.querySelector("#packageType2").value)
        let toMonth = Number(document.querySelector("#packageType2-2").value)
        if (!fromYear){
            alert('Başlanğıc ilini daxil edin!')
            return;}
        if (fromYear<1970){
            fromYear = 1970
        }
        if (!toYear){
            toYear = new Date().getFullYear()
        }
        if (!fromMonth){
            fromMonth = 1}
        if (!toMonth){
            toMonth = 12}
        let refunds = []
        for (let year = fromYear;year<=toYear;year++){
            for (let month = (year===fromYear?fromMonth:1);month<=(year===toYear?toMonth:12);month++){
                const monthStr = ('0'+month).substr(('0'+month).length-2,2)
                let request = await fetch("https://qaime.e-taxes.gov.az/service/eqaime.getDeclarationList", {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `year=${year}&type=01&month=${monthStr}`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"})
                .then(response=>response.json())
                .then(response=>response.declList)
                .then(response=>response.filter(x=>(x?.declSumTotalEDV!=='') && (x?.declDate!=='')))
                .then(response=>response.sort((x,y)=>(stringToDate(y.declDate)-stringToDate(x.declDate)))[0])
                .catch()
                if (request?.declOid){
                    let response = await localforage.getItem(request.declOid)
                    if (!response || new Blob([response]).size < 4092){
                        response = await fetch("https://qaime.e-taxes.gov.az/service/eqaime.getRefundedList", {
                            "headers": {
                                "accept": "text/plain, */*; q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://qaime.e-taxes.gov.az/PG_REFUND",
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": `year=${year}&type=01&month=${monthStr}&declOid=${request.declOid}&state=all`,
                            "method": "POST",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(response=>response.text()).catch()
                        localforage.setItem(request.declOid, response)
                    }
                    refunds.push(response)
                }
            }};
        
        const th = ['Dövr','№','Tarix','Seriya','Nömrə','Sətir kodu', 'VÖEN','Adı','Malın ümumi dəyəri','Malın ƏDV dəyəri','Ödənilmiş ümumi dəyər','Ödənilmiş ƏDV']
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        table.appendChild(thead)
        let tr = thead.insertRow()
        th.forEach(x=>{
            let th = document.createElement('th')
            th.innerHTML = x
            tr.appendChild(th)
        })
        tr = thead.insertRow()
        for (let x=1;x<=th.length;x++){
            let th = document.createElement('th')
            th.innerHTML = "'" + x
            tr.appendChild(th)
        }
        const tbody = document.createElement('tbody')
        table.appendChild(tbody)
        for (let i = 0;i < refunds.length; i++){
            let refundlist = JSON.parse(refunds[i])?.refundListDTO
            for (let j = 0; j<=refundlist.length-1; j++){
                try{
                    const refund = refundlist[j]
                    let row = tbody.insertRow()
                    if (refund.qaimeSeria==='Cəmi'){
                        row.insertCell().innerHTML = '01.' + refundlist[j-1].donem.substr(4,2) + '.' + refundlist[j-1].donem.substr(0,4);
                        row.insertCell().innerHTML = '';
                        row.insertCell().innerHTML = '';
                        row.insertCell().innerHTML = refund.qaimeSeria;
                        row.insertCell().innerHTML = refund.qaimeNum;
                        row.insertCell().innerHTML = refund.columnCode;
                        row.insertCell().innerHTML = refund.toVoen;
                        row.insertCell().innerHTML = refund.payerName;
                        row.insertCell().innerHTML = "'"+refund.umumiEdvsiz.replace(/\./g,',');
                        row.insertCell().innerHTML = "'"+refund.umumiEdv.replace(/\./g,',');
                        row.insertCell().innerHTML = "'"+refund.odenilmisEdvsiz.replace(/\./g,',');
                        row.insertCell().innerHTML = "'"+refund.odenilmisEdv.replace(/\./g,',');
                    } else {
                        row.insertCell().innerHTML = '01.' + refundlist[j].donem.substr(4,2) + '.' + refundlist[j].donem.substr(0,4);
                        row.insertCell().innerHTML = j+1;
                        row.insertCell().innerHTML = stringToDate(refund.qaimeDate + '000000').toLocaleDateString("ru");
                        row.insertCell().innerHTML = refund.qaimeSeria;
                        row.insertCell().innerHTML = refund.qaimeNum;
                        row.insertCell().innerHTML = refund.columnCode;
                        row.insertCell().innerHTML = refund.toVoen;
                        row.insertCell().innerHTML = refund.payerName;
                        row.insertCell().innerHTML = refund.umumiEdvsiz.replace(/\./g,',');
                        row.insertCell().innerHTML = refund.umumiEdv.replace(/\./g,',');
                        row.insertCell().innerHTML = refund.odenilmisEdvsiz.replace(/\./g,',');
                        row.insertCell().innerHTML = refund.odenilmisEdv.replace(/\./g,',');
                    }
                } catch {
                    continue}
            }}
        let newTab = window.open()
        sleep(100)
        table.id = 'refund'
        newTab.document.body.appendChild(table)
        table.style.borderCollapse = 'collapse'
        newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
    }
    async function printList(){
        let popUpsBlocked = false
        try {
            setTimeout(()=>{
                let newTab = window.open(null,'popup','width=1,height=1,left=0,top=0,scrollbars=no');
                sleep(1000)
                if(!newTab) {
                    popUpsBlocked = true
                }
                newTab.close()
            },100)
        } catch {
            window.alert('Brauzerdə Pop-up Blokeri bağlamaq lazımdır!!!')
            return '';
        }
        if (popUpsBlocked) {
            alert('Brauzerdə Pop-up Blokeri bağlamaq lazımdır!!!')
            return '';}
        document.querySelector("#filterButton").click();
        const pages = {'getDocList':['getInboxVHF','inboxList'],
                       'getAllDocList':['getOutboxVHF','outboxList'],
                       'getDrafts':['getDraftboxVHF','draftboxList'],}
        const statuses = {"wf_flow_sign" :"Təsdiq gözləyən",
                          "wf_approve_sign" :"Təsdiqlənmiş",
                          "wf_send_back_for_correction" :"Düzəlişə göndərilmiş",
                          "wf_cancel_app" :"Ləğv edilmiş",
                          "wf_auto_cancel" :"Sistem tərəfindən ləğv edilib",
                          "wf_auto_approve" :"Sistem tərəfindən təsdiqlənmiş",
                          "wf_edit_after_sign" :"Düzəliş edilmiş",
                          "wf_flow_sign_for_correction" :"Təsdiq gözləyən",
                          "wf_cancel_request_sign" :"Ləğvə göndərildi",
                          "wf_cancel_approve_sign" :"Ləğv təsdiqləndi",
                          "wf_imtina_for_correction" :"Düzəlişdən imtina/Təsdiqlənmiş",
                          "wf_imtina_for_cancel_request" :"Ləğvdən imtina/Təsdiqlənmiş"};
        const erDocTypes = {"docType_3":"Malların, işlərin və xidmətlərin təqdim edilməsi qaiməsi",
                            "docType_4":"Malların tam qaytarılması qaiməsi",
                            "docType_13":"Malların qismən qaytarılması qaiməsi",
                            "docType_5":"Qaytarma istisna olmaqla VM-in 163-cü maddəsinə əsasən dəqiqləşdirilmiş qaimə",
                            "docType_11":"Malların agentə/komisyonçuya verilməsi qaiməsi",
                            "docType_12":"Agent/Komisyonçu tərəfindən malların alıcıya təqdim edilməsi qaiməsi",
                            "docType_8":"VM-in 177.5-ci maddəsinə əsasən təqdim edilən qaimə",
                            "docType_9":"Malların emala göndərilməsi qaiməsi",
                            "docType_10":"Malların emaldan qaytarılması qaiməsi",}
        const docTypes = {'0':'Cari'}
        const currentPage = Object.keys(pages).filter(page=>window.location.href.includes(page))[0]
        const filterTaxIds = [document.querySelector("#voen").value,]
        const lists = []
        for (let f = 0; f < filterTaxIds.length; f++){
            const filterTaxId = filterTaxIds[f];
            const filterStatus = document.querySelector("#wfState").value;
            const filterType = document.querySelector("#docType").value;
            const filterFromDate = document.querySelector("#startDate").value;
            const filterToDate = document.querySelector("#endDate").value;
            const filterSer = document.querySelector("#vhfSeria").value.toUpperCase();
            const filterNumber = document.querySelector("#vhfNum").value;
            if (!filterFromDate){
                alert('Başlanğıc tarixi mütləq qeyd edilməlidir!!!')
                return;
            }

            for (let page = 1;page<=500;page++){
                sleep(1000)
                const response = await fetch(`https://qaime.e-taxes.gov.az/service/eqaime.${pages[currentPage][0]}`, {
                    "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    "body": `voen=${filterTaxId}&wfState=${filterStatus}&docType=${filterType}&fromDate=${dateToString(filterFromDate)}&toDate=${dateToString(filterToDate)}&vhfSeria=${filterSer}&vhfNum=${filterNumber}&pagination%5Boffset%5D=${(page-1)*200}&pagination%5Blimit%5D=200`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(response=>response.json());
                const eqfs = response[pages[currentPage][1]];
                lists.push(...eqfs)
                if (eqfs.length<200){
                    break}
            }

        }

        lists.sort((a,b)=>(a.voen - b.voen || stringToDate(a.createdDate)-stringToDate(b.createdDate)) || (Number(a.vhfNum)-Number(b.vhfNum)));
        if (!document.querySelector("#userChecker").checked){
            const th = ['№','Tipi','Növü','Vəziyyəti','VÖEN','Ödəyici adı','Tarix','Seriya','Nömrəsi','Qeyd','Əlavə qeyd','Əsas məbləğ','Ödənilməli ƏDV','Yol vergisi','Yekun məbləğ']
            const table = document.createElement('table')
            const thead = document.createElement('thead')
            table.appendChild(thead)
            let tr = thead.insertRow()
            for (let x=1; x<=th.length; x++){
                let thd = document.createElement('th')
                thd.innerHTML = "'" + x
                tr.appendChild(thd)
            }
            tr = thead.insertRow()
            th.forEach(x=>{
                let th = document.createElement('th')
                th.innerHTML = x
                tr.appendChild(th)
            })
            const tbody = document.createElement('tbody')
            table.appendChild(tbody)
            for (let i = 0;i<lists.length;i++){
                try{
                    const list = lists[i]
                    let row = tbody.insertRow()
                    row.insertCell().innerHTML = i+1
                    row.insertCell().innerHTML = docTypes[list.docType]
                    row.insertCell().innerHTML = erDocTypes[list.erDocType]
                    row.insertCell().innerHTML = statuses[Object.keys(statuses).filter(status=>list.status.includes(status))[0]]
                    row.insertCell().innerHTML = list.voen
                    row.insertCell().innerHTML = list.voenFullname
                    row.insertCell().innerHTML = stringToDate(list.createdDate).toLocaleString('RU-ru').replace(',','')
                    row.insertCell().innerHTML = list.vhfSeria
                    row.insertCell().innerHTML = list.vhfNum
                    row.insertCell().innerHTML = list.vhfMainSubject
                    row.insertCell().innerHTML = list.vhfAddSubject
                    row.insertCell().innerHTML = new String(Round(Number(list.malinUmumiDeger)-Number(list.malinUmumiEdv)-Number(list?.yolVergisi),2)).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.malinUmumiEdv || 0 ).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.yolVergisi || 0).replace(/\./,',')
                    row.insertCell().innerHTML = new String(list.malinUmumiDeger || 0).replace(/\./,',')
                } catch {
                    continue}
            }
            let row = tbody.insertRow()
            for (let i = 0;i<th.length;i++){
                if (i===0){
                    const cell = row.insertCell()
                    cell.textContent = ''
                    //cell.colSpan = 2;
                } else if (i===2){
                    const cell = row.insertCell()
                    cell.textContent = 'Cəmi';
                    //cell.colSpan = 9;
                    continue;
                } else if ([11,12,13,14].includes(i)){
                    let sum = 0;
                    for (let j = 0;j<tbody.rows.length-1;j++){
                        sum+=Number(tbody.rows[j].cells[i].textContent.replace(/,/,'.'))
                    }
                    row.insertCell().innerHTML = "'" + new String(Round(sum)).replace('.',',');
                    continue;
                } else {
                    row.insertCell()
                }
            }
            let newTab = window.open()
            newTab.document.body.appendChild(table)
            table.style.borderCollapse = 'collapse'
            newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
        } else {
            let responses = []
            for (let j = 0; j < lists.length; j++){
                let x = lists[j]
                let response = await localforage.getItem(x.oid)
                if (response && new Blob([response]).size >= 4092){
                    responses.push(response)
                } else {
                    let request = await fetch('https://qaime.e-taxes.gov.az/service/eqaime.printQaime', {
                        'headers': {
                            'accept': 'text/plain, */*; q=0.01',
                            'accept-language': 'en-US,en;q=0.9',
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'sec-ch-ua': '\'Google Chrome\';v=\'87\', \' Not;A Brand\';v=\'99\', \'Chromium\';v=\'87\'',
                            'sec-ch-ua-mobile': '?0',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'x-requested-with': 'XMLHttpRequest'
                        },
                        'body': `docOidList%5B%5D=${x.oid}`,
                        'method': 'POST',
                        'mode': 'cors',
                        'credentials': 'include'
                    })
                    for (let t = 0; t <= 20 ; t++){
                        try {
                            await sleep(t * 1000)
                            if (request.status!==429){
                                let response = await request.text()
                                localforage.setItem(x.oid,response)
                                responses.push(response)
                                break;
                            }
                        } catch (error){
                            //console.log(error)
                        }
                    }
                }
            }
            let htmls = []
            for (let i = 0 ; i < responses.length ; i++){
                try {
                    let response = JSON.parse(responses[i])
                    let html = new DOMParser().parseFromString(b64DecodeUnicode(response.htmlList[0]),'text/html')
                    htmls.push(html)
                } catch(error) {
                    console.log(error)
                }
            }
            const th = ['№','Tipi','Növü','EQF Statusu','Təqdim edənin VÖEN-i','Təqdim edənin adı','Alcının VÖEN-i','Alcının adı','EQF Tarixi','EQF Seriyası','EQF Nömrəsi','Əsas Qeyd','Əlavə Qeyd','Qaytarmanın tipi','Əsas sənədin seriyası','Əsas sənədin nömrəsi','Əsas Məbləğ','ƏDV Məbləği','Yol vergisi','Ümumi Məbləğ','Sıra №-si','Mal kodu','Mal adı','Barkod','Ölçü vahidi','Malın miqdarı','Malın buraxılış qiyməti','Cəmi qiyməti','Aksiz dərəcəsi','Aksiz məbləği','Cəmi məbləğ','ƏDV-yə cəlb edilən məbləğ','ƏDV-yə cəlb edilməyən məbləğ','ƏDV-dən azad olunan','ƏDV-yə 0 dərəcə ilə cəlb edilən məbləğ','Ödənilməli ƏDV','Yol vergisi məbləği','Yekun məbləğ','Mal/Xidmət']
            const table = document.createElement('table')
            const thead = document.createElement('thead')
            table.appendChild(thead)
            let tr = thead.insertRow()
            for (let x=1;x<=th.length;x++){
                let th = document.createElement('th')
                th.innerHTML = "'" + x
                tr.appendChild(th)
            }
            tr = thead.insertRow()
            th.forEach(x=>{
                let th = document.createElement('th')
                th.innerHTML = x
                tr.appendChild(th)
            })
            const tbody = document.createElement('tbody')
            table.appendChild(tbody)
            for (let i=0; i<htmls.length;i++){
                const html = htmls[i]
                for (let j = 6; j <= html.querySelector('body > table > tbody').childNodes.length-2;j++){
                    let product = html.querySelector('body > table > tbody').childNodes[j]
                    let row = tbody.insertRow()
                    row.insertCell().innerHTML = i+1
                    row.insertCell().innerHTML = docTypes[lists[i].docType]
                    row.insertCell().innerHTML = erDocTypes[lists[i].erDocType]
                    row.insertCell().innerHTML = statuses[Object.keys(statuses).filter(status=>lists[i].status.includes(status))[0]]
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').innerHTML.substring(0,10)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(2)').innerHTML.substring(11,100)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(5)').innerHTML.substring(0,10)
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(5)').innerHTML.substring(11,100)
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(8)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(5)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > div:nth-child(2) > span:nth-child(7)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(8)').innerHTML
                    row.insertCell().innerHTML = html.querySelector('body > p:nth-child(4) > span:nth-child(11)').innerHTML
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(14)")?.innerHTML || ''
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(17)")?.innerHTML || ''
                    row.insertCell().innerHTML = html.querySelector("body > p:nth-child(4) > span:nth-child(20)")?.innerHTML || ''
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(11) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(16) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(17) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = (j > 6 ? "'":'') + html.querySelector('body > table:nth-child(6) > tbody > tr:last-child > td:nth-child(18) > span').innerHTML.replace('.',',')
                    row.insertCell().innerHTML = j-5
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(0,10);
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(11,100);
                    row.insertCell().innerHTML = product.childNodes[2].textContent;
                    row.insertCell().innerHTML = product.childNodes[3].textContent;
                    row.insertCell().innerHTML = product.childNodes[4].textContent;
                    row.insertCell().innerHTML = product.childNodes[5].textContent;
                    row.insertCell().innerHTML = product.childNodes[6].textContent;
                    row.insertCell().innerHTML = product.childNodes[7].textContent;
                    row.insertCell().innerHTML = product.childNodes[8].textContent;
                    row.insertCell().innerHTML = product.childNodes[10].textContent;
                    row.insertCell().innerHTML = product.childNodes[11].textContent;
                    row.insertCell().innerHTML = product.childNodes[12].textContent;
                    row.insertCell().innerHTML = product.childNodes[13].textContent;
                    row.insertCell().innerHTML = product.childNodes[14].textContent;
                    row.insertCell().innerHTML = product.childNodes[15].textContent;
                    row.insertCell().innerHTML = product.childNodes[16].textContent;
                    row.insertCell().innerHTML = product.childNodes[17].textContent;
                    row.insertCell().innerHTML = product.childNodes[1].textContent.substring(0,2)=='99'?'Xidmət':'Mal';
                }
            }
            let row = tbody.insertRow()
            for (let c = 0;c<th.length;c++){
                if (c===0){
                    const cell = row.insertCell()
                    //cell.textContent = ''
                    //cell.colSpan = 2;
                    continue
                } else if (c===2){
                    const cell = row.insertCell()
                    cell.textContent = 'Cəmi';
                    //cell.colSpan = 11;
                    continue;
                }else if (range(23,16).includes(c)){
                    const cell = row.insertCell();
                    if ([16,17,18,19].includes(c)){
                        let sum = 0;
                        for (let r = 2;r<table.rows.length-1;r++){
                            if (table.rows[r].cells[9].textContent!==table.rows[r-1].cells[9].textContent || table.rows[r].cells[10].textContent!==table.rows[r-1].cells[10].textContent){
                                sum+=Number(table.rows[r].cells[c].textContent.replace(',','.'))}
                        }
                        cell.textContent = "'" + new String(Round(sum)).replace('.',',');
                        continue;
                    }
                    if (range(13,25).includes(c)){
                        let sum = 0;
                        for (let r = 2;r<table.rows.length-1;r++){
                            sum+=Number(table.rows[r].cells[c].textContent.replace(',','.'))
                        }
                        cell.textContent = "'" + new String(Round(sum)).replace('.',',');
                        continue;
                    }
                } else {
                    row.insertCell()
                }
            }
            let newTab = window.open()
            newTab.document.body.appendChild(table)
            table.style.borderCollapse = 'collapse'
            newTab.document.head.insertAdjacentHTML('beforeend','<style> table {borderCollapse:collapse} td,th {border: 1px solid black}; </style>')
        }
    }
    function b64DecodeUnicode (str) {
        /*// Going backwards: from bytestream, to percent-encoding, to original string.*/
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    function Round(number, digits=2){
        return Math.round(number*10**digits)/10**digits
    }

    function stringToDate(string){
        const [_,year,month,day,hour,minute,second,ms] = string.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{0,3})/)
        return new Date(year,month-1,day,hour,minute,second,ms)
    }
    function dateToString(datetime){
        try {
            const [date,time] = datetime.split(' ')
            const [day,month,year] = date.split('.')
            const [hour,minute,second] = time.split(':')
            return year+month+day+hour+minute+(second||'00')
        } catch {
            return ''}
    }
    function download(filename, blob) {
        let element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.setAttribute('download', filename);
        element.click();
    }
    async function sleep(ms){
        await new Promise(resolve=>{
            setTimeout(()=>resolve(),ms)
        })
    }

    (async ()=>{
        const children = document.querySelector("#default-datatable > tbody").children
        for (let i = 0; i < children.length; i++){
            const response = await fetch("https://qaime.e-taxes.gov.az/service/eqaime.printQaime", {
                "headers": {
                    "accept": "text/plain, */*; q=0.01",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                //"referrer": "https://qaime.e-taxes.gov.az/getDocData?docOid=61374bba51689&docNo=EBBH712022",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "docOidList%5B%5D=" + children[i].dataset.docoid,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }).then(response=>response.json())
            .then(response=>b64DecodeUnicode(response.value.htmlList[0]))
            try {
                const parsedHtml = new DOMParser().parseFromString(response,'text/html')
                let filename = parsedHtml.querySelector("span:nth-child(8)").textContent + ' ' + parsedHtml.querySelector("span:nth-child(5)").textContent + ' ' + parsedHtml.querySelector("span:nth-child(7)").textContent + ' ' + parsedHtml.querySelector("body > p:nth-child(4) > span:nth-child(5)").textContent + '.html'
                filename = filename.replace(/"/g,"''").replace(/\:/,'.')
                download(filename,new Blob([response],{type: 'text/plain'}))
            }catch{}
        }
});
func();
